import { derive } from 'valtio/utils';

import type { Team } from '../../../../models/team';
import type { TeamResonances } from '../../../../models/team-resonances';
import { type Weapon } from '../../../../models/weapon';
import type {
  WeaponAttackPercentBuff,
  WeaponBuff,
  WeaponCritRateBuff,
} from '../../../../models/weapon-buff';
import type { WeaponBuffDefinition } from '../../../../models/weapon-buff-definition';
import { gearComparerOptionsState } from '../gear-comparer-options';
import { selectedElementalTeamState } from './selected-elemental-team';
import { selectedElementalTeamResonancesState } from './selected-elemental-team-resonances';

export interface WeaponBuffsState {
  weaponAttackPercentBuffs: WeaponAttackPercentBuff[];
  weaponCritRateBuffs: WeaponCritRateBuff[];
}

export const weaponBuffsState = derive<object, WeaponBuffsState>({
  weaponAttackPercentBuffs: (get) => {
    const { selectedElementalType } = get(gearComparerOptionsState);
    const { selectedElementalTeam } = get(selectedElementalTeamState);
    const teamResonances = get(selectedElementalTeamResonancesState);

    if (!selectedElementalType || !selectedElementalTeam) return [];

    const buffs: WeaponAttackPercentBuff[] = [];
    const { weapon1, weapon2, weapon3 } = selectedElementalTeam;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      const weaponDefinition = weapon.definition;
      weaponDefinition.attackPercentBuffs.forEach((buffDefinition) => {
        if (
          !hasMetWeaponBuffRequirements(
            buffDefinition,
            weapon,
            teamResonances,
            selectedElementalTeam
          )
        )
          return;
        if (!buffDefinition.elementalTypes.includes(selectedElementalType))
          return;

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
    const { selectedElementalTeam } = get(selectedElementalTeamState);
    const teamResonances = get(selectedElementalTeamResonancesState);

    if (!selectedElementalTeam) return [];

    const buffs: WeaponCritRateBuff[] = [];
    const { weapon1, weapon2, weapon3 } = selectedElementalTeam;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      const weaponDefinition = weapon.definition;
      weaponDefinition.critRateBuffs.forEach((buffDefinition) => {
        if (
          !hasMetWeaponBuffRequirements(
            buffDefinition,
            weapon,
            teamResonances,
            selectedElementalTeam
          )
        )
          return;

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
  teamResonances: TeamResonances,
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
  const { elementalResonance, weaponResonance } = teamResonances;

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
