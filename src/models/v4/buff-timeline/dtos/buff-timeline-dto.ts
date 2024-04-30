import type { AbilityTimelineDto } from '../../ability-timeline/dtos/ability-timeline-dto';
import type { BuffEventDto } from './buff-event-dto';

export interface BuffTimelineDto extends AbilityTimelineDto {
  events: BuffEventDto[];
}
