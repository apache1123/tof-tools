import type { Dto } from '../../../dto';
import type { DamageSummaryTimelineDto } from '../../damage-summary-timeline/dtos/damage-summary-timeline-dto';

export interface DamageRecordDto extends Dto {
  timeline: DamageSummaryTimelineDto;
}
