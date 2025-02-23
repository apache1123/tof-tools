import type { Serializable } from "../persistable";
import type { TimeInterval } from "../time-interval/time-interval";
import { TimelineEvent } from "../timeline/timeline-event";
import type { ResourceEventDto } from "./dtos/resource-event-dto";

export class ResourceEvent
  extends TimelineEvent
  implements Serializable<ResourceEventDto>
{
  public constructor(
    timeInterval: TimeInterval,
    /** Amount of resource added or subtracted */
    public amount: number,
    /** If true, this event has priority over others */
    public hasPriority = false,
    /** Is an depletion event */
    public isDepletion = false,
  ) {
    super(timeInterval);
  }

  public override toDto(): ResourceEventDto {
    const { amount } = this;
    return {
      ...super.toDto(),
      amount,
    };
  }
}
