import type { AbilityEventDto } from '../../ability-timeline/dtos/ability-event-dto';

export interface BuffEventDto extends AbilityEventDto {
  stacks: number;
}
