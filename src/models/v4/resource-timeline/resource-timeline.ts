import { minActionDuration } from '../../../constants/tick';
import { sum } from '../../../utils/math-utils';
import type { Serializable } from '../../persistable';
import { TimeInterval } from '../time-interval/time-interval';
import { Timeline } from '../timeline/timeline';
import type { ResourceTimelineDto } from './dtos/resource-timeline-dto';
import type { ResourceAction } from './resource-action';

export class ResourceTimeline
  extends Timeline<ResourceAction>
  implements Serializable<ResourceTimelineDto>
{
  /** Cumulated amount of resource up to (but not including) a point of time */
  public getCumulatedAmount(time: number) {
    const timeInterval = new TimeInterval(-minActionDuration, time); // start time is negative because there could be an action that adds the starting amount of a resource before the combat start time of time=0
    const resourceActions = this.getActionsEndingBetween(timeInterval);
    return sum(...resourceActions.map((action) => action.amount)).toNumber();
  }

  public toDto(): ResourceTimelineDto {
    const { actions } = this;
    return {
      ...super.toDto(),
      actions: actions.map((action) => ({
        ...action.toDto(),
        cumulatedAmount: this.getCumulatedAmount(action.endTime),
      })),
    };
  }
}
