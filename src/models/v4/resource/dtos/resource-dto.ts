import type { Dto } from '../../../dto';
import type { ResourceTimelineDto } from '../../resource-timeline/dtos/resource-timeline-dto';

export interface ResourceDto extends Dto {
  id: string;
  displayName: string;
  timeline: ResourceTimelineDto;
}
