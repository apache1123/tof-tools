import type { Dto } from "../../../db/repository/dto";
import type { DamageSummaryTimelineDto } from "../../damage-summary-timeline/dtos/damage-summary-timeline-dto";

export interface DamageRecordDto extends Dto {
  timeline: DamageSummaryTimelineDto;
}
