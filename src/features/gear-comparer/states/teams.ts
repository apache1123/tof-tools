import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { DataById } from '../../../models/data';
import type { CoreElementalType } from '../../../models/elemental-type';
import { newTeam, type Team } from '../../../models/team';

export interface TeamsState {
  teamsByElement: DataById<CoreElementalType, Team>;
}

export const teamsStateKey = 'teams';

export const teamsState = proxy<TeamsState>({
  teamsByElement: {
    Flame: newTeam(),
    Frost: newTeam(),
    Physical: newTeam(),
    Volt: newTeam(),
  },
});
devtools(teamsState, { name: teamsStateKey });
