import type { Serializable } from '../../persistable';
import type { Resource } from '../resource/resource';
import type { ResourceId } from '../resource/resource-definition';
import type { TimeInterval } from '../time-interval/time-interval';
import { TimelineEvent } from '../timeline/timeline-event';
import type { ResourceEventDto } from './dtos/resource-event-dto';

export class ResourceEvent
  extends TimelineEvent
  implements Serializable<ResourceEventDto>
{
  public resourceId: ResourceId;
  /** Amount of resource added or subtracted */
  public amount: number;
  /** If true, this event has priority over others */
  public hasPriority: boolean;

  public constructor(
    timeInterval: TimeInterval,
    resource: Resource,
    amount: number,
    hasPriority = false
  ) {
    super(timeInterval);
    this.resourceId = resource.id;
    this.amount = amount;
    this.hasPriority = hasPriority;
  }

  public override toDto(): ResourceEventDto {
    const { amount } = this;
    return {
      ...super.toDto(),
      amount,
    };
  }
}
