import BigNumber from "bignumber.js";

import type { WeaponElementalType } from "../../definitions/elemental-type";
import { calculateRelativeIncrease } from "../../utils/math-utils";
import { BaseAttacks } from "../base-attacks";
import type { CharacterData } from "../character/character-data";
import { CombatSimulator } from "../combat-simulator/combat-simulator";
import { Gear } from "../gear/gear";
import { GearSet } from "../gear/gear-set";
import type { SimulacrumTrait } from "../simulacrum-trait";
import type { Team } from "../team/team";
import type { Weapon } from "../weapon/weapon";

/** Gear comparison of character damage with the equipped team, gear set, etc. vs. the same character with the new gear equipped. */
export class GearComparison {
  public constructor(
    private readonly characterData: CharacterData,
    private readonly baseAttacks: BaseAttacks,
    private readonly critRateFlat: number,
    private readonly team: Team,
    private readonly mainWeapon: Weapon,
    private readonly simulacrumTrait: SimulacrumTrait | undefined,
    private readonly currentGearSet: GearSet,
    /** The current piece of gear in the current gear set that is being compared */
    private readonly currentGear: Gear,
    /** The new piece of gear that is being compared */
    private readonly newGear: Gear,
  ) {
    // function createRequirements(
    //   definition: AbilityRequirementsDefinition,
    // ): GearCompareBuffAbilityRequirements {
    //   return new GearCompareBuffAbilityRequirements(
    //     team,
    //     new TeamRequirements(
    //       definition.teamRequirements?.anyWeapon,
    //       new WeaponResonanceRequirements(
    //         definition.teamRequirements?.weaponResonance?.is,
    //         definition.teamRequirements?.weaponResonance?.isNot,
    //       ),
    //       new ElementalWeaponRequirements(
    //         definition.teamRequirements?.elementalWeapons?.numOfElementalWeapons,
    //         definition.teamRequirements?.elementalWeapons?.numOfNotElementalWeapons,
    //         definition.teamRequirements?.elementalWeapons?.numOfDifferentElementalTypes,
    //       ),
    //     ),
    //   );
    // }
  }

  /** The results of the current gear */
  public getCurrentGearResult() {
    return this.getGearResult(
      this.currentGearSet,
      this.currentGear,
      this.baseAttacks,
      this.critRateFlat,
    );
  }

  /** The results of the new piece of gear */
  public getNewGearResult() {
    // Create a copy of the current gear set with the gear replaced with the new gear
    const newGearSet = GearSet.createCopy(this.currentGearSet);
    newGearSet.getSlot(this.newGear.type.id).gear = this.newGear;

    // Adjust stats
    const { newBaseAttacks, newCritRateFlat } = this.getAdjustedStats(
      this.baseAttacks,
      this.critRateFlat,
      this.currentGear,
      this.newGear,
    );

    return this.getGearResult(
      newGearSet,
      this.newGear,
      newBaseAttacks,
      newCritRateFlat,
    );
  }

  private getGearResult(
    gearSet: GearSet,
    gear: Gear,
    baseAttacks: BaseAttacks,
    critRateFlat: number,
  ) {
    const { damageSummary, buffSummary } = this.getSimulationResult(
      gearSet,
      baseAttacks,
      critRateFlat,
    );

    // Copy the gear set with the gear removed
    const gearSetWithoutGear = GearSet.createCopy(gearSet);
    gearSetWithoutGear.getSlot(gear.type.id).gear = undefined;

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

    let gearValue = 0;
    if (damageWithoutGear > 0) {
      gearValue = calculateRelativeIncrease(
        damageSummary.totalDamage.finalDamage,
        damageWithoutGear,
      );
    }

    return {
      damageSummary,
      buffSummary,
      /** The damage when the piece of gear is equipped, relative to the damage when that piece of gear is not equipped.
       * a.k.a. the damage increase with vs without that piece of gear
       */
      gearValue,
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

    combatSimulator.beginMockCombat();
    combatSimulator.switchToWeapon(this.mainWeapon);
    combatSimulator.performMockAttack();

    return {
      damageSummary: combatSimulator.generateDamageSummary(),
      buffSummary: combatSimulator.generateLastBuffSummary(),
    };
  }

  /** Returns new adjusted stats based on the difference between the original and new gear. It is assumed the stat inputs include the stats of the original gear already. If the new gear is undefined, the result is the stat inputs minus the stats of the original gear. */
  private getAdjustedStats(
    baseAttacks: BaseAttacks,
    critRateFlat: number,
    originalGear: Gear,
    newGear: Gear | undefined,
  ) {
    if (newGear) {
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

    // No new gear, so the new stats are the original stats minus the stats of the original gear
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
}
