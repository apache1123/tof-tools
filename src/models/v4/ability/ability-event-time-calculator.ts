import { TimeInterval } from '../time-interval/time-interval';
import type { Timeline } from '../timeline/timeline';
import type { AbilityEndedBy } from './ability-ended-by';

// TODO: This should be moved to a more appropriate place, perhaps into Ability
export class AbilityEventTimeCalculator {
  private readonly abilityEndedBy: AbilityEndedBy;
  private readonly timeline: Timeline;

  public constructor(abilityEndedBy: AbilityEndedBy, timeline: Timeline) {
    this.abilityEndedBy = abilityEndedBy;
    this.timeline = timeline;
  }

  public calculateAbilityEventTimeInterval(startTime: number): TimeInterval {
    let endTime!: number;

    const {
      duration,
      combatEnd,
      buffEnd,
      activeWeapon,
      notActiveWeapon,
      resourceDepleted,
    } = this.abilityEndedBy;
    if (duration) {
      endTime = startTime + duration;
    } else if (
      combatEnd ||
      buffEnd ||
      activeWeapon ||
      notActiveWeapon ||
      resourceDepleted
    ) {
      // For abilities that are ended by a certain condition, set the end time to be the timeline's end time. The ability event will be ended by an event related to that condition
      endTime = this.timeline.endTime;
    } else {
      throw new Error('Cannot determine ability event end time');
    }

    return new TimeInterval(startTime, endTime);
  }
}
