import { derive } from 'valtio/utils';

import type { TeamResonances } from '../../../../models/team-resonances';
import { selectedElementalTeamState } from './selected-elemental-team';

export type SelectedElementalTeamResonancesState = TeamResonances;

export const selectedElementalTeamResonancesState = derive<
  object,
  SelectedElementalTeamResonancesState
>({
  elementalResonance: (get) => {
    const { selectedElementalTeam } = get(selectedElementalTeamState);
    if (!selectedElementalTeam) return undefined;

    return selectedElementalTeam.getElementalResonance();
  },
  weaponResonance: (get) => {
    const { selectedElementalTeam } = get(selectedElementalTeamState);
    if (!selectedElementalTeam) return undefined;

    return selectedElementalTeam.getWeaponResonance();
  },
});
