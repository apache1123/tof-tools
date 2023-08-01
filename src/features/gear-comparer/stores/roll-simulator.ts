import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { defaultNumOfRandomStats } from '../../../constants/gear';
import { copyGear, type Gear, getType, newGear } from '../../../models/gear';
import { gearComparerGearsStore } from './gear-comparer-gear';

export interface RollSimulatorStore {
  gear: Gear | undefined;
  rolls: number[];
}

export const rollSimulatorStore = proxy<RollSimulatorStore>({
  gear: undefined,
  rolls: defaultRolls(),
});
export const rollSimulatorStoreKey = 'rollSimulator';
devtools(rollSimulatorStore, { name: rollSimulatorStoreKey });

export function copyFromGearB() {
  const { GearB } = gearComparerGearsStore;
  if (!GearB) return;
  const gear = newGear(getType(GearB));
  copyGear(GearB, gear);
  rollSimulatorStore.gear = gear;
}

export function addRoll(randomStatIndex: number) {
  if (rollSimulatorStore.rolls[randomStatIndex] !== undefined) {
    rollSimulatorStore.rolls[randomStatIndex] += 1;
  }
}

export function resetRolls() {
  rollSimulatorStore.rolls = defaultRolls();
}

function defaultRolls() {
  return [...Array(defaultNumOfRandomStats)].map(() => 0);
}
