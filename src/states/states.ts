import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { GearComparerState } from './gear-comparer';
import { LoadoutsState } from './loadouts';
import { RollSimulatorState } from './roll-simulator';
import { UserStatsState } from './user-stats';

export const userStatsStateKey = 'userStats';
export const userStatsState = proxy(new UserStatsState());
devtools(userStatsState, { name: userStatsStateKey });

export const loadoutsStateKey = 'loadouts';
export const loadoutsState = proxy(new LoadoutsState(userStatsState));
devtools(loadoutsState, { name: loadoutsStateKey });

export const gearComparerStateKey = 'gearComparer';
export const gearComparerState = proxy(
  new GearComparerState(loadoutsState, userStatsState)
);
devtools(gearComparerState, { name: gearComparerStateKey });

export const rollSimulatorState = proxy(
  new RollSimulatorState(gearComparerState)
);
export const rollSimulatorStateKey = 'rollSimulator';
devtools(rollSimulatorState, { name: rollSimulatorStateKey });
