import type { TimelineEventDto } from "../../timeline/dtos/timeline-event-dto";

export interface ResourceEventDto extends TimelineEventDto {
  amount: number;
}
