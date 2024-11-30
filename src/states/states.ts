import { proxy } from "valtio";
import { devtools } from "valtio/utils";

import { ChangelogState } from "./changelog";
import { createInitialCharactersState } from "./characters/create-initial-characters-state";
import { GearsState } from "./gears/gears-state";
import { MatricesState } from "./matrices/matrices-state";
// import { GearComparerState } from "./gear-comparer";
// import { LoadoutsState } from "./loadouts";
import { RelicsState } from "./relics";
import { WeaponsState } from "./weapons/weapons-state";
// import { RollSimulatorState } from "./roll-simulator";

export const changelogState = proxy(new ChangelogState());
export const changelogStateKey = "changelog";
devtools(changelogState, { name: "changelog" });

export const charactersState = proxy(createInitialCharactersState());
export const charactersStateKey = "characters";
devtools(charactersState, { name: charactersStateKey });

export const gearsState = proxy(new GearsState(charactersState));
export const gearsStateKey = "gears";
devtools(gearsState, { name: gearsStateKey });

export const weaponsState = proxy(new WeaponsState(charactersState));
export const weaponsStateKey = "weapons";
devtools(weaponsState, { name: weaponsStateKey });

export const matricesState = proxy(new MatricesState(charactersState));
export const matricesStateKey = "matrices";
devtools(matricesState, { name: matricesStateKey });

// export const loadoutsState = proxy(new LoadoutsState(userStatsState));
// export const loadoutsStateKey = "loadouts";
// devtools(loadoutsState, { name: loadoutsStateKey });

// export const gearComparerState = proxy(new GearComparerState(loadoutsState));
// export const gearComparerStateKey = "gearComparer";
// devtools(gearComparerState, { name: gearComparerStateKey });

// export const rollSimulatorState = proxy(
//   new RollSimulatorState(gearComparerState),
// );
// export const rollSimulatorStateKey = "rollSimulator";
// devtools(rollSimulatorState, { name: rollSimulatorStateKey });

export const relicsState = proxy(new RelicsState());
export const relicsStateKey = "relics";
devtools(relicsState, { name: relicsStateKey });
