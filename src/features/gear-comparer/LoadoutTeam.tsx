import { useSnapshot } from 'valtio';

import type { GearComparerState } from '../../states/gear-comparer';
import { gearComparerState } from '../../states/states';
import { TeamEditor } from '../TeamEditor';

export function LoadoutTeam() {
  const {
    selectedLoadout: { team: teamSnap },
  } = useSnapshot(gearComparerState) as GearComparerState;
  const teamState = gearComparerState.selectedLoadout.team;

  return <TeamEditor teamSnap={teamSnap} teamState={teamState} />;
}
