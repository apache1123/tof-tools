import { useSnapshot } from "valtio";

import type { LoadoutsState } from "../../states/loadouts";
import { loadoutsState } from "../../states/states";
import { TeamEditor } from "../TeamEditor";

export function LoadoutTeam() {
  const {
    selectedLoadout: { team: teamSnap },
  } = useSnapshot(loadoutsState) as LoadoutsState;
  const teamState = loadoutsState.selectedLoadout.team;

  return <TeamEditor teamSnap={teamSnap} teamState={teamState} />;
}
