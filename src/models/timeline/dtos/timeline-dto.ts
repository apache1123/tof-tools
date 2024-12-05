import type { Dto } from "../../../db/repository/dto";
import type { TimelineEventDto } from "./timeline-event-dto";

export interface TimelineDto extends Dto {
  events: TimelineEventDto[];
}
