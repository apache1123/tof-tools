import type { Dto } from '../../../dto';
import type { TimelineEventDto } from './timeline-event-dto';

export interface TimelineDto extends Dto {
  events: TimelineEventDto[];
}
