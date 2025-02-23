import { sum } from "../../utils/math-utils";
import type { Serializable } from "../persistable";
import { TimeInterval } from "../time-interval/time-interval";
import { Timeline } from "../timeline/timeline";
import type { ResourceTimelineDto } from "./dtos/resource-timeline-dto";
import type { ResourceEvent } from "./resource-event";

export class ResourceTimeline
  extends Timeline<ResourceEvent>
  implements Serializable<ResourceTimelineDto>
{
  /** Cumulated amount of resource up to (but not including) a point of time */
  public getCumulatedAmount(time: number) {
    if (time === this.startTime) return 0;

    const timeInterval = new TimeInterval(this.startTime, time);
    const resourceEvents = this.getEventsEndingBetween(timeInterval);
    return sum(...resourceEvents.map((event) => event.amount)).toNumber();
  }

  public override toDto(): ResourceTimelineDto {
    const { events } = this;
    return {
      ...super.toDto(),
      events: events.map((event) => ({
        ...event.toDto(),
        cumulatedAmount: this.getCumulatedAmount(event.endTime),
      })),
    };
  }
}
