import { derive } from "valtio/utils";

import type { TeamResonances } from "../../../../models/team-resonances";
import { getDefinition, type Weapon } from "../../../../models/weapon";
import type { WeaponAttackPercentBuff, WeaponCritRateBuff } from "../../../../models/weapon-buff";
import type { WeaponBuffDefinition } from "../../../../models/weapon-buff-definition";
import { gearComparerOptionsState } from "../gear-comparer-options";
import { selectedElementalTeamState } from "./selected-elemental-team";
import { selectedElementalTeamResonancesState } from "./selected-elemental-team-resonances";

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

      const weaponDefinition = getDefinition(weapon);
      weaponDefinition.attackPercentBuffs.forEach((buffDefinition) => {
        if (!hasMetWeaponBuffRequirements(buffDefinition, weapon, teamResonances)) return;
        if (!buffDefinition.elementalTypes.includes(selectedElementalType)) return;

        const { description, displayName, value, elementalTypes } = buffDefinition;
        buffs.push({
          description,
          displayName,
          value,
          elementalTypes,
          weaponId: weaponDefinition.id,
          weaponDisplayName: weaponDefinition.displayName,
        });
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

      const weaponDefinition = getDefinition(weapon);
      weaponDefinition.critRateBuffs.forEach((buffDefinition) => {
        if (!hasMetWeaponBuffRequirements(buffDefinition, weapon, teamResonances)) return;

        const { description, displayName, value } = buffDefinition;
        buffs.push({
          description,
          displayName,
          value,
          weaponId: weaponDefinition.id,
          weaponDisplayName: weaponDefinition.displayName,
        });
      });
    });

    return buffs;
  },
})

function hasMetWeaponBuffRequirements(
  buffDefinition: WeaponBuffDefinition,
  weapon: Weapon,
  teamResonances: TeamResonances
): boolean {
  const {
    minStarRequirement,
    maxStarRequirement,
    elementalResonanceRequirements,
    weaponResonanceRequirements,
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

  return true;
}