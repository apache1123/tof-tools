import type { DamageSummaryTimelineDto } from "../../damage-summary-timeline/dtos/damage-summary-timeline-dto";
import type { Dto } from "../../dto";

export interface DamageRecordDto extends Dto {
  timeline: DamageSummaryTimelineDto;
}
