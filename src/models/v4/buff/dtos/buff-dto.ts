import type { Dto } from '../../../dto';
import type { BuffTimelineDto } from '../../buff-timeline/dtos/buff-timeline-dto';
import type { BuffId } from '../buff-definition';

export interface BuffDto extends Dto {
  id: BuffId;
  displayName: string;
  timeline: BuffTimelineDto;
}
