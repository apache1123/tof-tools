import type { Dto } from '../../../dto';

export interface TimelineEventDto extends Dto {
  startTime: number;
  endTime: number;
  duration: number;
}
