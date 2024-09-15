import type { Dto } from '../../../dto';
import type { TimelineDto } from '../../timeline/dtos/timeline-dto';
import type { AbilityId } from '../ability-id';

export interface AbilityDto extends Dto {
  id: AbilityId;
  displayName: string;
  timeline: TimelineDto;
}
