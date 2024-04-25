import { TimeInterval } from './time-interval';

export class TickTracker {
  private _currentTickInterval: TimeInterval;
  private readonly tickDuration: number;

  public constructor(startingTickInterval: TimeInterval, tickDuration: number) {
    this._currentTickInterval = startingTickInterval;
    this.tickDuration = tickDuration;
  }

  /** The current tick interval that is being simulated */
  public get currentTickInterval() {
    return this._currentTickInterval;
  }

  /** The start time of the current tick interval that is being simulated */
  public get currentTickStart() {
    return this._currentTickInterval.startTime;
  }

  /** The end time of the current tick interval that is being simulated */
  public get currentTickEnd() {
    return this._currentTickInterval.endTime;
  }

  /** The next tick interval after the current tick interval */
  public getNextTickInterval() {
    const { endTime } = this._currentTickInterval;
    return new TimeInterval(endTime, endTime + this.tickDuration);
  }

  /** Advance the next tick interval that is being simulated */
  public advanceTickInterval() {
    this._currentTickInterval = this.getNextTickInterval();
  }

  /** Returns the next available tick interval given a time. The assumption is that any sort of action should be executed in the next tick, so given a time an action wishes to be executed, this gives the next closest tick interval */
  public getNextClosestTickInterval(time: number) {
    return time < this.currentTickInterval.startTime
      ? this.currentTickInterval
      : this.getNextTickInterval();
  }

  /** Returns the next available tick start time given a time. The assumption is that any sort of action should be executed in the next tick, so given a time an action wishes to be executed, this gives the next closest tick start time */
  public getNextClosestTickStart(time: number) {
    return this.getNextClosestTickInterval(time).startTime;
  }

  /** Returns the next available tick end time given a time. The assumption is that any sort of action should be executed at the start of the next tick, so given a time an action wishes to be executed, this gives the next closest tick end time */
  public getNextClosestTickEnd(time: number) {
    return this.getNextClosestTickInterval(time).endTime;
  }
}
