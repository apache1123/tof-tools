import type { TimelineDto } from '../../timeline/dtos/timeline-dto';
import type { DamageSummaryActionDto } from './damage-summary-action-dto';

export interface DamageSummaryTimelineDto extends TimelineDto {
  actions: DamageSummaryActionDto[];
}
