import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { defaultNumOfRandomStats } from '../../../constants/gear';
import { Gear } from '../../../models/gear';
import { gearComparerGearsState } from './gear-comparer-gear';

export interface RollSimulatorState {
  gear: Gear | undefined;
  rolls: number[];
}

export const rollSimulatorState = proxy<RollSimulatorState>({
  gear: undefined,
  rolls: defaultRolls(),
});
export const rollSimulatorStateKey = 'rollSimulator';
devtools(rollSimulatorState, { name: rollSimulatorStateKey });

export function copyFromGearB() {
  const { GearB } = gearComparerGearsState;
  if (!GearB) return;
  const gear = new Gear(GearB.type);
  Gear.copy(GearB, gear);
  rollSimulatorState.gear = gear;
}

export function addRoll(randomStatIndex: number) {
  if (rollSimulatorState.rolls[randomStatIndex] !== undefined) {
    rollSimulatorState.rolls[randomStatIndex] += 1;
  }
}

export function resetRolls() {
  rollSimulatorState.rolls = defaultRolls();
}

function defaultRolls() {
  return [...Array(defaultNumOfRandomStats)].map(() => 0);
}
