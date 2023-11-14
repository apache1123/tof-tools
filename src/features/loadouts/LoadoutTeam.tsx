import { useSnapshot } from 'valtio';

import type { Team } from '../../models/team';
import { loadoutsState } from '../../states/loadouts';
import { TeamEditor } from '../TeamEditor';

export function LoadoutTeam() {
  const {
    selectedLoadout: { team: teamSnap },
  } = useSnapshot(loadoutsState);
  const teamState = loadoutsState.selectedLoadout.team;

  return <TeamEditor teamSnap={teamSnap as Team} teamState={teamState} />;
}
