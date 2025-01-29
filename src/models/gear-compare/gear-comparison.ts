import { calculateRelativeIncrease } from "../../utils/math-utils";
import type { CharacterData } from "../character/character-data";
import { CombatSimulator } from "../combat-simulator/combat-simulator";
import type { Gear } from "../gear/gear";
import { GearSet } from "../gear/gear-set";
import type { SimulacrumTrait } from "../simulacrum-trait";
import type { Team } from "../team/team";
import type { Weapon } from "../weapon/weapon";

/** Gear comparison of character damage with the equipped team, gear set, etc. vs. the same character with the new gear equipped. */
export class GearComparison {
  public constructor(
    private readonly characterData: CharacterData,
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
    return this.getGearResult(this.currentGearSet, this.currentGear);
  }

  /** The results of the new piece of gear */
  public getNewGearResult() {
    // Create a copy of the current gear set with the gear replaced with the new gear
    const newGearSet = GearSet.createCopy(this.currentGearSet);
    newGearSet.getSlot(this.newGear.type.id).gear = this.newGear;

    return this.getGearResult(newGearSet, this.newGear);
  }

  private getGearResult(gearSet: GearSet, gear: Gear) {
    const { damageSummary, buffSummary } = this.getSimulationResult(gearSet);

    // Copy the gear set with the gear removed
    const gearSetWithoutGear = GearSet.createCopy(gearSet);
    gearSetWithoutGear.getSlot(gear.type.id).gear = undefined;

    const damageWithoutGear =
      this.getSimulationResult(gearSetWithoutGear).damageSummary.totalDamage
        .finalDamage;

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

  private getSimulationResult(gearSet: GearSet) {
    const combatSimulator = new CombatSimulator(
      this.characterData,
      this.team,
      gearSet,
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
}
