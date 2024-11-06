import type { TimelineDto } from "../../timeline/dtos/timeline-dto";
import type { ResourceEventDto } from "./resource-event-dto";

export interface ResourceTimelineDto extends TimelineDto {
  events: ResourceTimelineEventDto[];
}

export interface ResourceTimelineEventDto extends ResourceEventDto {
  cumulatedAmount: number;
}
