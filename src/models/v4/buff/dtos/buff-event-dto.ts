import type { AbilityEventDto } from '../../ability/dtos/ability-event-dto';

export interface BuffEventDto extends AbilityEventDto {
  stacks: number;
}
