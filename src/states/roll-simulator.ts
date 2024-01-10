import { defaultNumOfRandomStats } from '../constants/gear';
import { Gear } from '../models/gear';
import type { GearComparerState } from './gear-comparer';

export class RollSimulatorState {
  private _gear: Gear | undefined;
  private _rolls: number[] = [];

  private readonly _gearComparerState;

  public constructor(gearComparerState: GearComparerState) {
    this._gearComparerState = gearComparerState;

    this._gear = undefined;
    this.resetRolls();
  }

  public get gear() {
    return this._gear;
  }

  public get rolls() {
    return this._rolls;
  }

  public get gearValue(): number {
    if (!this._gear) return 0;

    return this._gearComparerState.loadoutsState.selectedLoadout.getSubstituteGearValue(
      this._gear
    );
  }

  public copyFromReplacementGear() {
    const { replacementGear } = this._gearComparerState;
    const gear = new Gear(replacementGear.type);
    Gear.copy(replacementGear, gear);
    this._gear = gear;
  }

  public addRoll(randomStatIndex: number) {
    if (this._rolls[randomStatIndex] !== undefined) {
      this._rolls[randomStatIndex] += 1;
    }
  }

  public resetRolls() {
    this._rolls = [...Array(defaultNumOfRandomStats)].map(() => 0);
  }
}
