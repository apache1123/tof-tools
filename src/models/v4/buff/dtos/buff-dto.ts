import type { AbilityDto } from '../../ability/dtos/ability-dto';
import type { BuffTimelineDto } from '../../buff-timeline/dtos/buff-timeline-dto';
import type { BuffId } from '../buff-definition';

export interface BuffDto extends AbilityDto {
  id: BuffId;
  timeline: BuffTimelineDto;
}
