import type { Serializable } from '../../persistable';
import { Timeline } from '../timeline/timeline';
import type { DamageSummaryEvent } from './damage-summary-event';
import type { DamageSummaryTimelineDto } from './dtos/damage-summary-timeline-dto';

export class DamageSummaryTimeline
  extends Timeline<DamageSummaryEvent>
  implements Serializable<DamageSummaryTimelineDto>
{
  public toDto(): DamageSummaryTimelineDto {
    const { events } = this;
    return {
      ...super.toDto(),
      events: events.map((event) => event.toDto()),
    };
  }
}
