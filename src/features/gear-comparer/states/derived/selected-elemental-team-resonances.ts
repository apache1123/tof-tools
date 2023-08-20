import { derive } from 'valtio/utils';

import { getElementalResonance, getWeaponResonance, } from '../../../../models/team';
import type { TeamResonances } from '../../../../models/team-resonances';
import { selectedElementalTeamState } from './selected-elemental-team';

export type SelectedElementalTeamResonancesState = TeamResonances;

export const selectedElementalTeamResonancesState = derive<
  object,
  SelectedElementalTeamResonancesState
>({
  elementalResonance: (get) => {
    const {selectedElementalTeam} = get(selectedElementalTeamState)
    if (!selectedElementalTeam) return undefined;

    return getElementalResonance(selectedElementalTeam);
  },
  weaponResonance: (get) => {
    const {selectedElementalTeam} = get(selectedElementalTeamState)
    if (!selectedElementalTeam) return undefined; 

    return getWeaponResonance(selectedElementalTeam);
  }
});
