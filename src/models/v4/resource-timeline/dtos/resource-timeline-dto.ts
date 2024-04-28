import type { TimelineDto } from '../../timeline/dtos/timeline-dto';
import type { ResourceActionDto } from './resource-action-dto';

export interface ResourceTimelineDto extends TimelineDto {
  actions: ResourceTimelineActionDto[];
}

export interface ResourceTimelineActionDto extends ResourceActionDto {
  cumulatedAmount: number;
}
