import type { DamageSummaryDto } from '../../damage-summary/dtos/damage-summary-dto';
import type { TimelineEventDto } from '../../timeline/dtos/timeline-event-dto';

export interface DamageSummaryEventDto extends TimelineEventDto {
  cumulatedDamageSummary: DamageSummaryDto;
}
