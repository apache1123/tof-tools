import type { ActionTimelineDto } from '../../action-timeline/dtos/action-timeline-dto';
import type { BuffActionDto } from './buff-action-dto';

export interface BuffTimelineDto extends ActionTimelineDto {
  actions: BuffActionDto[];
}
