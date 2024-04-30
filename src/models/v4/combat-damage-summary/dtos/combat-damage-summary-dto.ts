import type { Dto } from '../../../dto';
import type { DamageSummaryDto } from '../../damage-summary/dtos/damage-summary-dto';
import type { DamageSummaryTimelineDto } from '../../damage-summary-timeline/dtos/damage-summary-timeline-dto';

export interface CombatDamageSummaryDto extends Dto {
  timeline: DamageSummaryTimelineDto;
  cumulatedDamageSummary: DamageSummaryDto | undefined;
}
