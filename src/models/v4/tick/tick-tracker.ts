import type { CurrentTick } from './current-tick';
import { Tick } from './tick';

export class TickTracker {
  private _currentTick: Tick;
  public readonly tickDuration: number;

  public constructor(startingTime: number, tickDuration: number) {
    this._currentTick = new Tick(startingTime, startingTime + tickDuration);
    this.tickDuration = tickDuration;
  }

  /** The current tick interval that is being simulated */
  public get currentTick(): CurrentTick {
    return this._currentTick;
  }

  /** Advance the next tick interval that is being simulated */
  public advanceTick() {
    this._currentTick = this.getNextTick();
  }

  /** The next tick interval after the current tick interval */
  private getNextTick(): Tick {
    const { endTime } = this._currentTick;
    return new Tick(endTime, endTime + this.tickDuration);
  }
}
