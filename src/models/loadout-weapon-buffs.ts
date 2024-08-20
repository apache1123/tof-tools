import type { Loadout } from './loadout';
import type { Weapon } from './weapon';
import type {
  WeaponAttackPercentBuff,
  WeaponBuff,
  WeaponCritDamageBuff,
  WeaponCritRateBuff,
} from './weapon-buff';
import type { WeaponBuffDefinition } from './weapon-buff-definition';
import type { WeaponDefinition } from './weapon-definition';

export class LoadoutWeaponBuffs {
  private _loadout: Loadout;

  public constructor(loadout: Loadout) {
    this._loadout = loadout;
  }

  /** Weapon attack% buffs that have met the requirements to be enabled.
   * They could be active when idle (passive buff), or inactive when idle (conditional buff), but are ready to be activated in combat.
   */
  public get attackPercentBuffs(): WeaponAttackPercentBuff[] {
    const { elementalType, team } = this._loadout;

    const buffs: WeaponAttackPercentBuff[] = [];
    team.weapons.forEach((weapon) => {
      const weaponDefinition = weapon.definition;
      weaponDefinition.attackPercentBuffs.forEach((buffDefinition) => {
        if (!this.hasMetBuffRequirements(buffDefinition, weapon)) return;
        if (!buffDefinition.elementalTypes.includes(elementalType)) return;

        const { elementalTypes, canStack } = buffDefinition;
        const buff: WeaponAttackPercentBuff = {
          ...this.mapBuffDefinitionToBuff(buffDefinition, weaponDefinition),
          elementalTypes,
        };

        this.addBuff(buff, buffs, canStack);
      });
    });

    return buffs;
  }

  /** Weapon crit% buffs that have met the requirements to be enabled.
   * They could be active when idle (passive buff), or inactive when idle (conditional buff), but are ready to be activated in combat.
   */
  public get critRateBuffs(): WeaponCritRateBuff[] {
    const buffs: WeaponCritRateBuff[] = [];
    this._loadout.team.weapons.forEach((weapon) => {
      const weaponDefinition = weapon.definition;
      weaponDefinition.critRateBuffs.forEach((buffDefinition) => {
        if (!this.hasMetBuffRequirements(buffDefinition, weapon)) return;

        const { canStack } = buffDefinition;
        const buff: WeaponCritRateBuff = this.mapBuffDefinitionToBuff(
          buffDefinition,
          weaponDefinition
        );
        this.addBuff(buff, buffs, canStack);
      });
    });

    return buffs;
  }

  /** Weapon crit damage% buffs that have met the requirements to be enabled.
   * They could be active when idle (passive buff), or inactive when idle (conditional buff), but are ready to be activated in combat.
   */
  public get critDamageBuffs(): WeaponCritDamageBuff[] {
    const buffs: WeaponCritDamageBuff[] = [];
    this._loadout.team.weapons.forEach((weapon) => {
      const weaponDefinition = weapon.definition;
      weaponDefinition.critDamageBuffs.forEach((buffDefinition) => {
        if (!this.hasMetBuffRequirements(buffDefinition, weapon)) return;

        const { canStack } = buffDefinition;
        const buff: WeaponCritDamageBuff = this.mapBuffDefinitionToBuff(
          buffDefinition,
          weaponDefinition
        );
        this.addBuff(buff, buffs, canStack);
      });
    });

    return buffs;
  }

  private hasMetBuffRequirements(
    buffDefinition: WeaponBuffDefinition,
    weapon: Weapon
  ): boolean {
    const {
      minStarRequirement,
      maxStarRequirement,
      elementalResonanceRequirements,
      weaponResonanceRequirements,
      elementalWeaponsRequirements,
    } = buffDefinition;
    const { stars } = weapon;
    const { elementalResonances, weaponResonance } = this._loadout.team;

    if (stars < minStarRequirement || stars > maxStarRequirement) return false;

    if (
      elementalResonanceRequirements &&
      elementalResonanceRequirements.every(
        (x) => !elementalResonances.includes(x)
      )
    )
      return false;

    // TODO: This is duplicated in loadout-matrix-set-buffs.ts
    if (
      weaponResonanceRequirements &&
      (!weaponResonance ||
        !weaponResonanceRequirements.includes(weaponResonance))
    )
      return false;

    // TODO: This is duplicated in loadout-matrix-set-buffs.ts
    if (elementalWeaponsRequirements) {
      let hasMetElementalWeaponsRequirement = false;
      elementalWeaponsRequirements.forEach(
        ({ weaponElementalType, minNumOfWeapons, maxNumOfWeapons }) => {
          const elementalWeaponCount =
            this._loadout.team.weaponElementalTypes.filter(
              (x) => x === weaponElementalType
            ).length;

          if (
            elementalWeaponCount >= minNumOfWeapons &&
            elementalWeaponCount <= maxNumOfWeapons
          )
            hasMetElementalWeaponsRequirement = true;
        }
      );

      if (!hasMetElementalWeaponsRequirement) return false;
    }

    return true;
  }

  private addBuff(
    buff: WeaponBuff,
    collection: WeaponBuff[],
    canStack: boolean
  ) {
    if (canStack) {
      collection.push(buff);
    } else {
      const duplicate = collection.find(
        (addedBuff) => addedBuff.id === buff.id
      );
      if (!duplicate) {
        collection.push(buff);
      }
    }
  }

  private mapBuffDefinitionToBuff(
    buffDefinition: WeaponBuffDefinition,
    weaponDefinition: WeaponDefinition
  ): WeaponBuff {
    const { id, description, displayName, value, isActivePassively } =
      buffDefinition;
    return {
      id,
      description,
      displayName,
      value,
      isActivePassively,
      weaponId: weaponDefinition.id,
      weaponDisplayName: weaponDefinition.displayName,
    };
  }
}
