import type { Dto } from '../../../dto';
import type { AttackTimelineDto } from '../../attack-timeline/dtos/attack-timeline-dto';
import type { AttackId } from '../attack-definition';

export interface AttackDto extends Dto {
  id: AttackId;
  displayName: string;
  timeline: AttackTimelineDto;
}
