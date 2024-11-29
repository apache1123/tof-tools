import type { DamageSummary } from "../damage-summary/damage-summary";
import type { Serializable } from "../persistable";
import type { TimeInterval } from "../time-interval/time-interval";
import { TimelineEvent } from "../timeline/timeline-event";
import type { DamageSummaryEventDto } from "./dtos/damage-summary-event-dto";

export class DamageSummaryEvent
  extends TimelineEvent
  implements Serializable<DamageSummaryEventDto>
{
  public constructor(
    timeInterval: TimeInterval,
    public damageSummary: DamageSummary,
  ) {
    super(timeInterval);
  }
}
