import { derive } from 'valtio/utils';

import type { Team } from '../../../../models/team';
import { teamsState } from '../../../../states/teams';
import { gearComparerOptionsState } from '../gear-comparer-options';

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
