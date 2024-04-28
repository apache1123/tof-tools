import type { DamageSummaryDto } from '../../damage-summary/dtos/damage-summary-dto';
import type { TimelineActionDto } from '../../timeline/dtos/timeline-action-dto';

export interface DamageSummaryActionDto extends TimelineActionDto {
  cumulatedDamageSummary: DamageSummaryDto;
}
