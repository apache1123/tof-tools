import BigNumber from "bignumber.js";

import type { WeaponElementalType } from "../../definitions/elemental-type";
import type { GearTypeId } from "../../definitions/gear-types";
import { calculateRelativeIncrease } from "../../utils/math-utils";
import { BaseAttacks } from "../base-attacks";
import type { CharacterData } from "../character/character-data";
import { CombatSimulator } from "../combat-simulator/combat-simulator";
import { Gear } from "../gear/gear";
import { GearSet } from "../gear/gear-set";
import type { SimulacrumTrait } from "../simulacrum-trait";
import type { Team } from "../team/team";
import type { Weapon } from "../weapon/weapon";
import type { GearDamageResult } from "./gear-damage-result";

/** Simulate gear damage results using the equipped team, gear set, etc. as base  */
export class GearDamageSimulator {
  public constructor(
    private readonly characterData: CharacterData,
    private readonly baseAttacks: BaseAttacks,
    private readonly critRateFlat: number,
    private readonly team: Team,
    private readonly mainWeapon: Weapon,
    private readonly simulacrumTrait: SimulacrumTrait | undefined,
    private readonly gearSet: GearSet,
  ) {}

  /** The results of a gear currently in the gear set, specified by its gear type */
  public getCurrentGearResult(gearTypeId: GearTypeId) {
    return this.getGearResult(
      this.gearSet,
      gearTypeId,
      this.baseAttacks,
      this.critRateFlat,
    );
  }

  /** The results of a new piece of gear if it replaces the corresponding gear type in the gear set
   * @param newGear The new piece of gear that will replace the current gear in the gear set */
  public getNewGearResult(newGear: Gear) {
    const typeId = newGear.type.id;

    // Create a copy of the current gear set with the gear replaced with the new gear
    const newGearSet = GearSet.createCopy(this.gearSet);
    newGearSet.getSlot(typeId).gear = newGear;

    // Adjust stats
    const currentGear = this.gearSet.getSlot(typeId).gear;
    const { newBaseAttacks, newCritRateFlat } = this.getAdjustedStats(
      this.baseAttacks,
      this.critRateFlat,
      currentGear,
      newGear,
    );

    return this.getGearResult(
      newGearSet,
      typeId,
      newBaseAttacks,
      newCritRateFlat,
    );
  }

  private getGearResult(
    gearSet: GearSet,
    gearTypeId: GearTypeId,
    baseAttacks: BaseAttacks,
    critRateFlat: number,
  ): GearDamageResult {
    const { damageSummary, damageBreakdown } = this.getSimulationResult(
      gearSet,
      baseAttacks,
      critRateFlat,
    );

    const gear = gearSet.getSlot(gearTypeId).gear;

    if (!gear) {
      return {
        damageSummary,
        damageBreakdown,
        damageIncrease: 0,
      };
    }

    // Copy the gear set with the gear removed
    const gearSetWithoutGear = GearSet.createCopy(gearSet);
    gearSetWithoutGear.getSlot(gearTypeId).gear = undefined;

    // Adjust stats
    const { newBaseAttacks, newCritRateFlat } = this.getAdjustedStats(
      baseAttacks,
      critRateFlat,
      gear,
      undefined,
    );

    const damageWithoutGear = this.getSimulationResult(
      gearSetWithoutGear,
      newBaseAttacks,
      newCritRateFlat,
    ).damageSummary.totalDamage.finalDamage;

    const damageIncrease =
      damageWithoutGear > 0
        ? calculateRelativeIncrease(
            damageSummary.totalDamage.finalDamage,
            damageWithoutGear,
          )
        : 0;

    let maxTitanResult = undefined;
    const maxTitanGear = gear.getMaxTitanGear(
      this.mainWeapon.damageElement === "Altered"
        ? undefined
        : this.mainWeapon.damageElement,
    );
    if (maxTitanGear) {
      // Copy the gear set with the gear replaced with the max titan gear
      const gearSetWithMaxTitanGear = GearSet.createCopy(gearSet);
      gearSetWithMaxTitanGear.getSlot(gear.type.id).gear = maxTitanGear;

      // Adjust stats
      const { newBaseAttacks, newCritRateFlat } = this.getAdjustedStats(
        baseAttacks,
        critRateFlat,
        gear,
        maxTitanGear,
      );

      const {
        damageSummary: maxTitanDamageSummary,
        damageBreakdown: maxTitanDamageBreakdown,
      } = this.getSimulationResult(
        gearSetWithMaxTitanGear,
        newBaseAttacks,
        newCritRateFlat,
      );

      const maxTitanDamageIncrease =
        damageWithoutGear > 0
          ? calculateRelativeIncrease(
              maxTitanDamageSummary.totalDamage.finalDamage,
              damageWithoutGear,
            )
          : 0;

      maxTitanResult = {
        damageIncrease: maxTitanDamageIncrease,
        damageSummary: maxTitanDamageSummary,
        damageBreakdown: maxTitanDamageBreakdown,
      };
    }

    return {
      damageIncrease,
      damageSummary,
      damageBreakdown,
      maxTitan: maxTitanResult,
    };
  }

  private getSimulationResult(
    gearSet: GearSet,
    baseAttacks: BaseAttacks,
    critRateFlat: number,
  ) {
    const combatSimulator = new CombatSimulator(
      this.characterData,
      this.team,
      gearSet,
      baseAttacks,
      critRateFlat,
      this.simulacrumTrait,
      { combatDuration: 10000, targetResistance: 0 },
    );

    combatSimulator.beginCombat();

    // Max all resources in case some buffs that will be manually triggered below rely on resource requirements
    combatSimulator.maxAllResources();
    // Simulate damage fully buffed
    combatSimulator.triggerAllBuffs();

    combatSimulator.switchToWeapon(this.mainWeapon);
    combatSimulator.performMockAttack();

    return {
      damageSummary: combatSimulator.generateDamageSummary(),
      damageBreakdown: combatSimulator.generateLastDamageBreakdown(),
    };
  }

  /** Returns new adjusted stats based on the difference between the original and new gear. It is assumed the stat inputs include the stats of the original gear already.
   * If the original gear is undefined, the result is the stat inputs plus the stats of the new gear.
   * If the new gear is undefined, the result is the stat inputs minus the stats of the original gear. */
  private getAdjustedStats(
    baseAttacks: BaseAttacks,
    critRateFlat: number,
    originalGear: Gear | undefined,
    newGear: Gear | undefined,
  ) {
    if (originalGear && newGear) {
      const statDifference = Gear.calculateStatDifference(
        originalGear,
        newGear,
      );

      const calculateNewBaseAttack = (element: WeaponElementalType) => {
        return BigNumber(baseAttacks.get(element))
          .plus(statDifference.elementalAttackFlats[element])
          .toNumber();
      };
      const newBaseAttacks = new BaseAttacks({
        Altered: calculateNewBaseAttack("Altered"),
        Flame: calculateNewBaseAttack("Flame"),
        Frost: calculateNewBaseAttack("Frost"),
        Physical: calculateNewBaseAttack("Physical"),
        Volt: calculateNewBaseAttack("Volt"),
      });

      const newCritRateFlat = BigNumber(critRateFlat)
        .plus(statDifference.critRateFlat)
        .toNumber();

      return { newBaseAttacks, newCritRateFlat };
    }

    // Has original gear + no new gear, so the new stats are the original stats minus the stats of the original gear
    if (originalGear && !newGear) {
      const calculateNewBaseAttack = (element: WeaponElementalType) => {
        return BigNumber(baseAttacks.get(element))
          .minus(originalGear.getTotalAttackFlat(element))
          .toNumber();
      };
      const newBaseAttacks = new BaseAttacks({
        Altered: calculateNewBaseAttack("Altered"),
        Flame: calculateNewBaseAttack("Flame"),
        Frost: calculateNewBaseAttack("Frost"),
        Physical: calculateNewBaseAttack("Physical"),
        Volt: calculateNewBaseAttack("Volt"),
      });

      const newCritRateFlat = BigNumber(critRateFlat)
        .minus(originalGear.getTotalCritFlat())
        .toNumber();

      return { newBaseAttacks, newCritRateFlat };
    }

    // No original gear + has new gear, so the new stats are the original stats plus the stats of the new gear
    if (!originalGear && newGear) {
      const calculateNewBaseAttack = (element: WeaponElementalType) => {
        return BigNumber(baseAttacks.get(element))
          .plus(newGear.getTotalAttackFlat(element))
          .toNumber();
      };
      const newBaseAttacks = new BaseAttacks({
        Altered: calculateNewBaseAttack("Altered"),
        Flame: calculateNewBaseAttack("Flame"),
        Frost: calculateNewBaseAttack("Frost"),
        Physical: calculateNewBaseAttack("Physical"),
        Volt: calculateNewBaseAttack("Volt"),
      });

      const newCritRateFlat = BigNumber(critRateFlat)
        .plus(newGear.getTotalCritFlat())
        .toNumber();

      return { newBaseAttacks, newCritRateFlat };
    }

    // No original and new gear, nothing to be adjusted
    return { newBaseAttacks: baseAttacks, newCritRateFlat: critRateFlat };
  }
}
