import { TimeInterval } from '../time-interval';
import type { ActionEndedBy } from './action-ended-by';
import type { ActionTimeline } from './action-timeline';

export class ActionTimeCalculator {
  private readonly actionEndedBy: ActionEndedBy;
  private readonly timeline: ActionTimeline;

  public constructor(actionEndedBy: ActionEndedBy, timeline: ActionTimeline) {
    this.actionEndedBy = actionEndedBy;
    this.timeline = timeline;
  }

  public calculateActionTimeInterval(time: number): TimeInterval {
    let endTime!: number;

    const {
      duration,
      combatEnd,
      buffEnd,
      activeWeapon,
      notActiveWeapon,
      resourceDepleted,
    } = this.actionEndedBy;
    if (duration) {
      endTime = time + duration;
    } else if (
      combatEnd ||
      buffEnd ||
      activeWeapon ||
      notActiveWeapon ||
      resourceDepleted
    ) {
      // For actions that are ended by a certain condition, set the end time to be the total duration. The action will be ended by an event related to that condition
      endTime = this.timeline.totalDuration;
    } else {
      throw new Error('Cannot determine action end time');
    }

    return new TimeInterval(time, endTime);
  }
}
