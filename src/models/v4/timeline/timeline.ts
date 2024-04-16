import type { TimePeriod } from '../time-period';
import type { TimelineAction } from './timeline-action';

export class Timeline<TAction extends TimelineAction> {
  private readonly _actions: TAction[] = [];

  public constructor(public readonly totalDuration: number) {}

  public get actions(): ReadonlyArray<TAction> {
    return this._actions;
  }

  public get lastAction(): TAction | undefined {
    return this.actions[this.actions.length - 1];
  }

  public addAction(action: TAction) {
    if (action.startTime >= this.totalDuration) {
      throw new Error(
        "Cannot add action that starts after the timeline's duration"
      );
    }

    if (this.lastAction && action.startTime < this.lastAction.startTime) {
      throw new Error(
        'Cannot add an action that is earlier than the latest action'
      );
    }

    // Cut off action if it goes past the timeline duration
    if (action.endTime > this.totalDuration) {
      action.endTime = this.totalDuration;
    }

    this._actions.push(action);
  }

  /** Returns actions that have any sort of overlap with the period of start time to end time. */
  public getActionsOverlappingPeriod(
    startTime: number,
    endTime: number
  ): TAction[] {
    if (startTime === endTime) {
      return this.getActionsOverlappingTime(startTime);
    }

    return this._actions.filter(
      (action) => action.startTime < endTime && action.endTime >= startTime
    );
  }

  public getActionsOverlappingTime(time: number) {
    return this._actions.filter(
      (action) => action.startTime <= time && action.endTime > time
    );
  }

  public getActionsEndingBetween(timePeriod: TimePeriod) {
    return this._actions.filter(
      (action) =>
        action.endTime > timePeriod.startTime &&
        action.endTime <= timePeriod.endTime
    );
  }
}
