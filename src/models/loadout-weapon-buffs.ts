import type { Loadout } from './loadout';
import type { Weapon } from './weapon';
import type {
  WeaponAttackPercentBuff,
  WeaponBuff,
  WeaponCritRateBuff,
} from './weapon-buff';
import type { WeaponBuffDefinition } from './weapon-buff-definition';

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
    const { weapon1, weapon2, weapon3 } = team;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      const weaponDefinition = weapon.definition;
      weaponDefinition.attackPercentBuffs.forEach((buffDefinition) => {
        if (!this.hasMetBuffRequirements(buffDefinition, weapon)) return;
        if (!buffDefinition.elementalTypes.includes(elementalType)) return;

        const {
          id,
          description,
          displayName,
          value,
          elementalTypes,
          isActivePassively,
          canStack,
        } = buffDefinition;
        const buff: WeaponAttackPercentBuff = {
          id,
          description,
          displayName,
          value,
          elementalTypes,
          isActivePassively,
          weaponId: weaponDefinition.id,
          weaponDisplayName: weaponDefinition.displayName,
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
    const { weapon1, weapon2, weapon3 } = this._loadout.team;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      const weaponDefinition = weapon.definition;
      weaponDefinition.critRateBuffs.forEach((buffDefinition) => {
        if (!this.hasMetBuffRequirements(buffDefinition, weapon)) return;

        const {
          id,
          description,
          displayName,
          value,
          canStack,
          isActivePassively,
        } = buffDefinition;
        const buff: WeaponCritRateBuff = {
          id,
          description,
          displayName,
          value,
          isActivePassively,
          weaponId: weaponDefinition.id,
          weaponDisplayName: weaponDefinition.displayName,
        };
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
    if (
      weaponResonanceRequirements &&
      (!weaponResonance ||
        !weaponResonanceRequirements.includes(weaponResonance))
    )
      return false;

    // TODO: This is duplicated in loadout-matrix-set-buffs.ts
    if (elementalWeaponsRequirements) {
      const { weapon1, weapon2, weapon3 } = this._loadout.team;
      const weaponElementalTypes = [weapon1, weapon2, weapon3].flatMap(
        (weapon) => (weapon ? weapon.definition.elementalTypes : [])
      );

      let hasMetElementalWeaponsRequirement = false;
      elementalWeaponsRequirements.forEach(
        ({ weaponElementalType, minNumOfWeapons }) => {
          if (
            weaponElementalTypes.filter((x) => x === weaponElementalType)
              .length >= minNumOfWeapons
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
}
