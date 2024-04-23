import { TimePeriod } from './time-period';

export class TickTracker {
  private _currentTickPeriod: TimePeriod;
  private readonly tickDuration: number;

  public constructor(startingTickPeriod: TimePeriod, tickDuration: number) {
    this._currentTickPeriod = startingTickPeriod;
    this.tickDuration = tickDuration;
  }

  /** The current tick period that is being simulated */
  public get currentTickPeriod() {
    return this._currentTickPeriod;
  }

  /** The next tick period after the current tick period */
  public getNextTickPeriod() {
    const { endTime } = this._currentTickPeriod;
    return new TimePeriod(endTime, endTime + this.tickDuration);
  }

  /** Advance the next tick period that is being simulated */
  public advanceTickPeriod() {
    this._currentTickPeriod = this.getNextTickPeriod();
  }

  /** Returns the next available tick period given a time. The assumption is that any sort of action should be executed at the start of the next tick, so given a time an action wishes to be executed, this gives the next closest tick period */
  public getNextClosestTickPeriod(time: number) {
    return time < this.currentTickPeriod.startTime
      ? this.currentTickPeriod
      : this.getNextTickPeriod();
  }

  /** Returns the next available tick start time given a time. The assumption is that any sort of action should be executed at the start of the next tick, so given a time an action wishes to be executed, this gives the next closest tick start time */
  public getNextClosestTickStart(time: number) {
    return this.getNextClosestTickPeriod(time).startTime;
  }
}
