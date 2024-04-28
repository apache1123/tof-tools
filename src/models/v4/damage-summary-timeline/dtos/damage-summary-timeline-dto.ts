import type { TimelineDto } from '../../timeline/dtos/timeline-dto';
import type { DamageSummaryEventDto } from './damage-summary-event-dto';

export interface DamageSummaryTimelineDto extends TimelineDto {
  events: DamageSummaryEventDto[];
}
