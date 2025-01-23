import { teamBuffs } from "../../definitions/team-buffs";
import type { AbilityRequirementsDefinition } from "../../definitions/types/ability/ability-requirements-definition";
import type { BuffAbilityDefinition as BuffAbilityDefinition } from "../../definitions/types/buff/buff-ability-definition";
import { calculateRelativeIncrease } from "../../utils/math-utils";
import type { ActiveWeapon } from "../active-weapon/active-weapon";
import { GearComparerActiveWeapon } from "../active-weapon/gear-comparer-active-weapon";
import { ActiveBuffs } from "../buff/active-buff/active-buffs";
import { AttackPercentBuff } from "../buff/attack-percent-buff/attack-percent-buff";
import { BaseAttackBuff } from "../buff/base-attack-buff/base-attack-buff";
import type { BuffSource } from "../buff/buff-source";
import { CritDamageBuff } from "../buff/crit-damage-buff/crit-damage-buff";
import { CritRateBuff } from "../buff/crit-rate-buff/crit-rate-buff";
import { ElementalDamageBuff } from "../buff/elemental-damage-buff/elemental-damage-buff";
import { FinalDamageBuff } from "../buff/final-damage-buff/final-damage-buff";
import { Character } from "../character/character";
import type { CharacterData } from "../character/character-data";
import { DamageEvent } from "../damage-event/damage-event";
import type { AttackHit } from "../event/messages/attack-hit";
import type { Gear } from "../gear/gear";
import { GearSet } from "../gear/gear-set";
import type { SimulacrumTrait } from "../simulacrum-trait";
import type { Target } from "../target/target";
import { ElementalWeaponRequirements } from "../team/elemental-weapon-requirements";
import type { Team } from "../team/team";
import { TeamRequirements } from "../team/team-requirements";
import { WeaponResonanceRequirements } from "../team/weapon-resonance-requirements";
import type { Weapon } from "../weapon/weapon";
import { GearCompareBuffAbilities } from "./gear-compare-buff-abilities";
import { GearCompareBuffAbility } from "./gear-compare-buff-ability";
import { GearCompareBuffAbilityRequirements } from "./gear-compare-buff-ability-requirements";

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
    this.target = { resistance: 0 };

    const weapons = team.getEquippedWeapons();

    const buffAbilityDefinitions: {
      source: BuffSource;
      abilityDefinitions: BuffAbilityDefinition[];
    }[] = [
      {
        source: "weapon",
        abilityDefinitions: weapons.flatMap((weapon) => weapon.buffDefinitions),
      },
      {
        source: "matrix",
        abilityDefinitions: [], // TODO:
        //   weapons.flatMap((weapon) =>
        //   weapon.matrixSets
        //     .getMatrixSets()
        //     .flatMap((matrixSet) => matrixSet.buffs),
        // ),
      },
      { source: "team", abilityDefinitions: teamBuffs },
    ];

    this.buffAbilities = new GearCompareBuffAbilities();
    for (const { source, abilityDefinitions } of buffAbilityDefinitions) {
      for (const abilityDef of abilityDefinitions) {
        const { id } = abilityDef;

        const baseAttackBuffs =
          abilityDef.baseAttackBuffs?.flatMap((baseAttackBuffDef) =>
            BaseAttackBuff.create(baseAttackBuffDef, id),
          ) ?? [];

        const attackPercentBuffs =
          abilityDef.attackPercentBuffs?.flatMap((attackBuffDef) =>
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
          attackPercentBuffs,
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
    this.activeWeapon.switchTo(mainWeapon);

    this.currentCharacter = new Character(
      this.characterData,
      this.team,
      this.currentGearSet,
      this.simulacrumTrait,
      this.activeBuffs,
      this.activeWeapon,
    );

    // Create a copy of the current gear set with the gear replaced with the new gear
    this.newGearSet = GearSet.createCopy(this.currentGearSet);
    this.newGearSet.getSlot(newGear.type.id).gear = newGear;

    this.newCharacter = new Character(
      this.characterData,
      this.team,
      this.newGearSet,
      this.simulacrumTrait,
      this.activeBuffs,
      this.activeWeapon,
    );

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

  /** Current character with the existing gear, used as a basis of comparison */
  private readonly currentCharacter: Character;

  /** Temporary new gear set. This is a copy of the current gear set with the gear replaced with the new gear */
  private readonly newGearSet: GearSet;
  /** Temporary new character, with the new gear equipped */
  private readonly newCharacter: Character;

  /** The damage value of a dummy hit using the current gear */
  public getCurrentCharacterDamage(): number {
    return this.getCharacterDamage(this.currentCharacter);
  }

  /** The damage value of a dummy hit using a temporary new character that is equipped with the new piece of gear */
  public getNewCharacterDamage(): number {
    return this.getCharacterDamage(this.newCharacter);
  }

  /** The damage when the current piece of gear is equipped, relative to the damage when that piece of gear is not equipped.
   * a.k.a. the damage increase with vs without that piece of gear
   */
  public getCurrentGearValue(): number {
    const characterWithoutGear = this.getCharacterWithoutGear(
      this.currentGear,
      this.currentGearSet,
    );
    const damageWithoutGear = this.getCharacterDamage(characterWithoutGear);

    if (damageWithoutGear === 0) {
      return 0;
    }

    return calculateRelativeIncrease(
      this.getCurrentCharacterDamage(),
      damageWithoutGear,
    );
  }

  /** The damage when the new piece of gear is equipped, relative to the damage when that piece of gear is not equipped.
   * a.k.a. the damage increase with vs without that piece of gear
   */
  public getNewGearValue(): number {
    const characterWithoutGear = this.getCharacterWithoutGear(
      this.newGear,
      this.newGearSet,
    );
    const damageWithoutGear = this.getCharacterDamage(characterWithoutGear);

    if (damageWithoutGear === 0) {
      return 0;
    }

    return calculateRelativeIncrease(
      this.getNewCharacterDamage(),
      damageWithoutGear,
    );
  }

  private getCharacterDamage(character: Character): number {
    const damageEvent = new DamageEvent(
      this.getAttackHit(),
      character,
      this.target,
      this.activeBuffs,
    );
    return damageEvent.getDamage().finalDamage;
  }

  /** Get a mock attack hit using the active weapon */
  private getAttackHit(): AttackHit {
    const weapon = this.activeWeapon.current;

    if (!weapon) {
      throw new Error("No active weapon");
    }

    // Use a mock attack hit that matches the element and applies all buffs
    return {
      applyAllBuffs: true,
      time: 0,
      damageElement: weapon.damageElement,
      baseDamageModifiers: {
        attackMultiplier: 1,
        attackFlat: 0,
        hpMultiplier: 0,
        sumOfResistancesMultiplier: 0,
        critRateFlatMultiplier: 0,
        resourceAmountMultiplier: 1,
      },
      finalDamageModifiers: { canOnlyBeBuffedByTitans: false },
      weaponId: weapon.definitionId,
      attackId: "",
      attackType: "normal",
    };
  }

  /** Returns a new character with the gear removed from the gear set */
  private getCharacterWithoutGear(gear: Gear, gearSet: GearSet) {
    // Copy the gear set with the gear removed
    const gearSetWithoutGear = GearSet.createCopy(gearSet);
    gearSetWithoutGear.getSlot(gear.type.id).gear = undefined;

    return new Character(
      this.characterData,
      this.team,
      gearSetWithoutGear,
      this.simulacrumTrait,
      this.activeBuffs,
      this.activeWeapon,
    );
  }
}
