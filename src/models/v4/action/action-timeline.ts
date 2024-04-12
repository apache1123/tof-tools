import { Timeline } from '../timeline/timeline';
import type { Action } from './action';

export class ActionTimeline<T extends Action = Action> extends Timeline<T> {
  public isActionActiveAt(time: number) {
    return this.getEventsOverlappingTime(time).length !== 0;
  }

  public isActionOnCooldownAt(time: number) {
    return this.events.some(
      (action) => action.startTime <= time && action.cooldownEndsAt > time
    );
  }

  /** Ends any active overlapping with the time at that time */
  public endAnyActionsAt(time: number) {
    const actions = this.getEventsOverlappingTime(time);
    for (const action of actions) {
      action.endTime = time;
    }
  }
}
