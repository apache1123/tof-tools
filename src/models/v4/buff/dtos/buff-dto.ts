import type { BuffId } from "../../../../definitions/types/buff/buff-ability";
import type { AbilityDto } from "../../ability/dtos/ability-dto";
import type { TimelineDto } from "../../timeline/dtos/timeline-dto";
import type { BuffEventDto } from "./buff-event-dto";

export interface BuffDto extends AbilityDto {
  id: BuffId;
  timeline: BuffTimelineDto;
}

interface BuffTimelineDto extends TimelineDto {
  events: BuffEventDto[];
}
