import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { GearComparerState } from './gear-comparer';
import { LoadoutsState } from './loadouts';
import { UserStatsState } from './user-stats';

export const userStatsStateKey = 'userStats';
export const userStatsState = proxy(new UserStatsState());
devtools(userStatsState, { name: userStatsStateKey });

export const loadoutsStateKey = 'loadouts';
export const loadoutsState = proxy(new LoadoutsState());
devtools(loadoutsState, { name: loadoutsStateKey });

export const gearComparerStateKey = 'gearComparer';
export const gearComparerState = proxy(new GearComparerState(loadoutsState));
devtools(gearComparerState, { name: gearComparerStateKey });
