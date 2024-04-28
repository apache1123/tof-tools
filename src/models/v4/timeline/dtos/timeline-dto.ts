import type { Dto } from '../../../dto';
import type { TimelineActionDto } from './timeline-action-dto';

export interface TimelineDto extends Dto {
  actions: TimelineActionDto[];
}
