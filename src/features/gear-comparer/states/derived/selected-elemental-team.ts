import { derive } from 'valtio/utils';

import type { Team } from '../../../../models/team';
import { gearComparerOptionsState } from '../gear-comparer-options';
import { teamsState } from '../teams';

export interface SelectedElementalTeamState {
  selectedElementalTeam: Team | undefined;
}

export const selectedElementalTeamState = derive<
  object,
  SelectedElementalTeamState
>({
  selectedElementalTeam: (get) => {
    const { selectedElementalType } = get(gearComparerOptionsState);
    if (!selectedElementalType) return undefined;

    return get(teamsState).teamsByElement[selectedElementalType];
  },
});
