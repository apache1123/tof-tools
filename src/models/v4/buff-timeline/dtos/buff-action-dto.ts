import type { ActionDto } from '../../action-timeline/dtos/action-dto';

export interface BuffActionDto extends ActionDto {
  stacks: number;
}
