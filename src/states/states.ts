import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { ChangelogState } from './changelog';
import { GearComparerState } from './gear-comparer';
import { LoadoutsState } from './loadouts';
import { RollSimulatorState } from './roll-simulator';
import { UserStatsState } from './user-stats';

export const userStatsState = proxy(new UserStatsState());
export const userStatsStateKey = 'userStats';
devtools(userStatsState, { name: userStatsStateKey });

export const loadoutsState = proxy(new LoadoutsState(userStatsState));
export const loadoutsStateKey = 'loadouts';
devtools(loadoutsState, { name: loadoutsStateKey });

export const gearComparerState = proxy(
  new GearComparerState(loadoutsState, userStatsState)
);
export const gearComparerStateKey = 'gearComparer';
devtools(gearComparerState, { name: gearComparerStateKey });

export const rollSimulatorState = proxy(
  new RollSimulatorState(gearComparerState)
);
export const rollSimulatorStateKey = 'rollSimulator';
devtools(rollSimulatorState, { name: rollSimulatorStateKey });

export const changelogState = proxy(new ChangelogState());
export const changelogStateKey = 'changelog';
devtools(changelogState, { name: 'changelog' });
