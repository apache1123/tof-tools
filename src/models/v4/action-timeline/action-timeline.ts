import type { Serializable } from '../../persistable';
import { Timeline } from '../timeline/timeline';
import type { Action } from './action';
import type { ActionTimelineDto } from './dtos/action-timeline-dto';

export class ActionTimeline<T extends Action = Action>
  extends Timeline<T>
  implements Serializable<ActionTimelineDto>
{
  public isActionActiveAt(time: number) {
    return this.getActionsOverlappingTime(time).length !== 0;
  }

  public isActionOnCooldownAt(time: number) {
    return this.actions.some(
      (action) => action.startTime <= time && action.cooldownEndsAt > time
    );
  }

  /** Ends any active actions overlapping with the time at that time
   * @returns actions that have been ended
   */
  public endAnyActionsAt(time: number) {
    const actions = this.getActionsOverlappingTime(time);
    for (const action of actions) {
      action.endTime = time;
    }
    return actions;
  }
}
