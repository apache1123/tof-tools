import BigNumber from "bignumber.js";

import type { WeaponElementalType } from "../../definitions/elemental-type";
import type { GearName } from "../../definitions/gear-types";
import { gearTypesLookup } from "../../definitions/gear-types";
import { teamBuffs } from "../../definitions/team-buffs";
import type { AbilityRequirements as AbilityRequirementsDefinition } from "../../definitions/types/ability/ability-requirements";
import type { BuffAbility as BuffAbilityDefinition } from "../../definitions/types/buff/buff-ability";
import { weaponDefinitions } from "../../definitions/weapons/weapon-definitions";
import { Gear } from "../gear/gear";
import { GearSet } from "../gear-set/gear-set";
import { Loadout } from "../loadout/loadout";
import type { ActiveWeapon } from "../v4/active-weapon/active-weapon";
import { GearComparerActiveWeapon } from "../v4/active-weapon/gear-comparer-active-weapon";
import { ActiveBuffs } from "../v4/buff/active-buff/active-buffs";
import { AttackPercentBuff } from "../v4/buff/attack-percent-buff/attack-percent-buff";
import { BaseAttackBuff } from "../v4/buff/base-attack-buff/base-attack-buff";
import type { BuffSource } from "../v4/buff/buff-source";
import { CritDamageBuff } from "../v4/buff/crit-damage-buff/crit-damage-buff";
import { CritRateBuff } from "../v4/buff/crit-rate-buff/crit-rate-buff";
import { ElementalDamageBuff } from "../v4/buff/elemental-damage-buff/elemental-damage-buff";
import { FinalDamageBuff } from "../v4/buff/final-damage-buff/final-damage-buff";
import { Character } from "../v4/character/character";
import type { CharacterInfo } from "../v4/character/character-info";
import { DamageEvent } from "../v4/damage-event/damage-event";
import type { AttackHit } from "../v4/event/messages/attack-hit";
import type { Target } from "../v4/target/target";
import { ElementalWeaponRequirements } from "../v4/team/elemental-weapon-requirements";
import { TeamRequirements } from "../v4/team/team-requirements";
import { WeaponResonanceRequirements } from "../v4/team/weapon-resonance-requirements";
import { Weapon } from "../weapon";
import { GearCompareBuffAbilities } from "./gear-compare-buff-abilities";
import { GearCompareBuffAbility } from "./gear-compare-buff-ability";
import { GearCompareBuffAbilityRequirements } from "./gear-compare-buff-ability-requirements";

export class GearCompare {
  /** Start a gear compare with a loadout as the basis */
  public constructor(
    private readonly basisLoadout: Loadout,
    private readonly characterInfo: CharacterInfo,
  ) {
    this.target = { resistance: 0 };

    const { team } = basisLoadout;
    const { weapons } = team;

    const buffAbilityDefinitions: {
      source: BuffSource;
      abilityDefinitions: BuffAbilityDefinition[];
    }[] = [
      {
        source: "weapon",
        abilityDefinitions: weapons.flatMap((weapon) => weapon.buffs),
      },
      {
        source: "matrix",
        abilityDefinitions: weapons.flatMap((weapon) =>
          weapon.matrixSets
            .getMatrixSets()
            .flatMap((matrixSet) => matrixSet.buffs),
        ),
      },
      { source: "team", abilityDefinitions: teamBuffs },
    ];

    this.buffAbilities = new GearCompareBuffAbilities([]);
    for (const { source, abilityDefinitions } of buffAbilityDefinitions) {
      for (const abilityDef of abilityDefinitions) {
        const { id } = abilityDef;

        const baseAttackBuffs =
          abilityDef.baseAttackBuffs?.flatMap((baseAttackBuffDef) =>
            BaseAttackBuff.create(baseAttackBuffDef, id),
          ) ?? [];

        const attackBuffs =
          abilityDef.attackBuffs?.flatMap((attackBuffDef) =>
            AttackPercentBuff.create(attackBuffDef, id),
          ) ?? [];

        const elementalDamageBuffs =
          abilityDef.elementalDamageBuffs?.flatMap((elementalDamageBuffDef) =>
            ElementalDamageBuff.create(elementalDamageBuffDef, id, source),
          ) ?? [];

        const finalDamageBuffs =
          abilityDef.finalDamageBuffs?.map((finalDamageBuffDef) =>
            FinalDamageBuff.create(finalDamageBuffDef, id, source),
          ) ?? [];

        const critRateBuffs =
          abilityDef.critRateBuffs?.map((critRateBuffDef) =>
            CritRateBuff.create(critRateBuffDef, id),
          ) ?? [];

        const critDamageBuffs =
          abilityDef.critDamageBuffs?.map((critDamageBuffDef) =>
            CritDamageBuff.create(critDamageBuffDef, id),
          ) ?? [];

        const buffAbility = new GearCompareBuffAbility(
          id,
          abilityDef.displayName,
          createRequirements(abilityDef.requirements),
          abilityDef.maxStacks,
          baseAttackBuffs,
          attackBuffs,
          elementalDamageBuffs,
          finalDamageBuffs,
          critRateBuffs,
          critDamageBuffs,
        );
        this.buffAbilities.add(buffAbility);
      }
    }

    this.activeBuffs = new ActiveBuffs(this.buffAbilities);
    this.activeWeapon = new GearComparerActiveWeapon();

    function createRequirements(
      definition: AbilityRequirementsDefinition,
    ): GearCompareBuffAbilityRequirements {
      return new GearCompareBuffAbilityRequirements(
        team,
        new TeamRequirements(
          definition.teamRequirements?.anyWeapon,
          new WeaponResonanceRequirements(
            definition.teamRequirements?.weaponResonance?.is,
            definition.teamRequirements?.weaponResonance?.isNot,
          ),
          new ElementalWeaponRequirements(
            definition.teamRequirements?.elementalWeapons?.numOfElementalWeapons,
            definition.teamRequirements?.elementalWeapons?.numOfNotElementalWeapons,
            definition.teamRequirements?.elementalWeapons?.numOfDifferentElementalTypes,
          ),
        ),
      );
    }
  }

  private readonly target: Target;
  private readonly buffAbilities: GearCompareBuffAbilities;
  private readonly activeBuffs: ActiveBuffs;
  private readonly activeWeapon: ActiveWeapon;

  /** The damage for the given element. Used as a basis for comparing gear */
  public getDamageBasis(element: WeaponElementalType): number {
    // Simulate a dummy attack hit to get the damage to use as the basis
    const character = new Character(
      this.characterInfo,
      this.basisLoadout,
      this.activeBuffs,
      this.activeWeapon,
    );
    const damageEvent = new DamageEvent(
      this.getAttackHit(element),
      character,
      this.target,
      this.activeBuffs,
    );

    return damageEvent.getDamage().finalDamage;
  }

  /** The damage when a piece of gear is equipped, relative to the damage when that piece of gear is not equipped.
   * a.k.a. the damage increase with vs without that piece of gear
   */
  public getGearValue(
    gearTypeId: GearName,
    element: WeaponElementalType,
  ): number {
    return this.getSubstituteGearValue(
      new Gear(gearTypesLookup.byId[gearTypeId]), // Empty gear of the same type
      element,
    );
  }

  /** The damage when a piece of gear is equipped, relative to the basis damage, if it replaces the basis loadout's corresponding piece of gear
   */
  public getSubstituteGearValue(
    substituteGear: Gear,
    element: WeaponElementalType,
  ): number {
    // Create a copy of the basis loadout with the gear replaced with the substitute gear
    const tempLoadout = Loadout.createCopy(this.basisLoadout);
    tempLoadout.gearSet = GearSet.createCopy(this.basisLoadout.gearSet);
    tempLoadout.replaceGear(substituteGear);

    // Simulate a dummy attack hit using the temp gear set to calculate how much it is relative to the basis damage
    const tempCharacter = new Character(
      this.characterInfo,
      tempLoadout,
      this.activeBuffs,
      this.activeWeapon,
    );

    const damageEvent = new DamageEvent(
      this.getAttackHit(element),
      tempCharacter,
      this.target,
      this.activeBuffs,
    );
    const damageWithSubstituteGear = damageEvent.getDamage().finalDamage;
    const damageWithBasisGear = this.getDamageBasis(element);

    return BigNumber(damageWithBasisGear)
      .minus(damageWithSubstituteGear)
      .div(damageWithSubstituteGear)
      .toNumber();
  }

  public setActiveWeapon(weapon: Weapon): void {
    this.activeWeapon.switchTo(weapon);
  }

  private getAttackHit(element: WeaponElementalType): AttackHit {
    // It doesn't matter what weapon is used as long as the element of the attack hit matches and all buffs apply
    const weapon = this.basisLoadout.team.weapons.length
      ? this.basisLoadout.team.weapons[0]
      : new Weapon(weaponDefinitions.byId["Cocoritter"]);

    // Use a mock attack hit that matches the element and applies all buffs
    return {
      applyAllBuffs: true,
      time: 0,
      damageElement: element,
      baseDamageModifiers: {
        attackMultiplier: 1,
        attackFlat: 0,
        hpMultiplier: 0,
        sumOfResistancesMultiplier: 0,
        critRateFlatMultiplier: 0,
        resourceAmountMultiplier: 1,
      },
      finalDamageModifiers: { canOnlyBeBuffedByTitans: false },
      weaponId: weapon.id,
      attackId: "",
      attackType: "normal",
    };
  }
}
