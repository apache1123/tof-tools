import type { Dto } from '../../../dto';
import type { AbilityTimelineDto } from '../../ability-timeline/dtos/ability-timeline-dto';
import type { AbilityId } from '../ability-definition';

export interface AbilityDto extends Dto {
  id: AbilityId;
  displayName: string;
  timeline: AbilityTimelineDto;
}
