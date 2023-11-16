import { derive } from 'valtio/utils';

import type { Team } from '../../../../models/team';
import { type Weapon } from '../../../../models/weapon';
import type {
  WeaponAttackPercentBuff,
  WeaponBuff,
  WeaponCritRateBuff,
} from '../../../../models/weapon-buff';
import type { WeaponBuffDefinition } from '../../../../models/weapon-buff-definition';
import { gearComparerState } from '../../../../states/states';

export interface WeaponBuffsState {
  weaponAttackPercentBuffs: WeaponAttackPercentBuff[];
  weaponCritRateBuffs: WeaponCritRateBuff[];
}

export const weaponBuffsState = derive<object, WeaponBuffsState>({
  weaponAttackPercentBuffs: (get) => {
    const {
      selectedLoadout: { elementalType, team },
    } = get(gearComparerState);

    const buffs: WeaponAttackPercentBuff[] = [];
    const { weapon1, weapon2, weapon3 } = team;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      const weaponDefinition = weapon.definition;
      weaponDefinition.attackPercentBuffs.forEach((buffDefinition) => {
        if (!hasMetWeaponBuffRequirements(buffDefinition, weapon, team)) return;
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
        addBuff(buff, buffs, canStack);
      });
    });

    return buffs;
  },
  weaponCritRateBuffs: (get) => {
    const {
      selectedLoadout: { team },
    } = get(gearComparerState);

    const buffs: WeaponCritRateBuff[] = [];
    const { weapon1, weapon2, weapon3 } = team;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      const weaponDefinition = weapon.definition;
      weaponDefinition.critRateBuffs.forEach((buffDefinition) => {
        if (!hasMetWeaponBuffRequirements(buffDefinition, weapon, team)) return;

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
        addBuff(buff, buffs, canStack);
      });
    });

    return buffs;
  },
});

function hasMetWeaponBuffRequirements(
  buffDefinition: WeaponBuffDefinition,
  weapon: Weapon,
  team: Team
): boolean {
  const {
    minStarRequirement,
    maxStarRequirement,
    elementalResonanceRequirements,
    weaponResonanceRequirements,
    elementalWeaponsRequirements,
  } = buffDefinition;
  const { stars } = weapon;
  const { elementalResonance, weaponResonance } = team;

  if (stars < minStarRequirement || stars > maxStarRequirement) return false;
  if (
    elementalResonanceRequirements &&
    (!elementalResonance ||
      !elementalResonanceRequirements.includes(elementalResonance))
  )
    return false;
  if (
    weaponResonanceRequirements &&
    (!weaponResonance || !weaponResonanceRequirements.includes(weaponResonance))
  )
    return false;

  // TODO: This is duplicated in matrix-set-buffs.ts
  if (elementalWeaponsRequirements) {
    const { weapon1, weapon2, weapon3 } = team;
    const weaponElementalTypes = [weapon1, weapon2, weapon3].map((weapon) =>
      weapon ? weapon.definition.elementalType : undefined
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

function addBuff(
  buff: WeaponBuff,
  collection: WeaponBuff[],
  canStack: boolean
) {
  if (canStack) {
    collection.push(buff);
  } else {
    const duplicate = collection.find((addedBuff) => addedBuff.id === buff.id);
    if (!duplicate) {
      collection.push(buff);
    }
  }
}
