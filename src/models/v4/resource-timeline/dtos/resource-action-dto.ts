import type { ActionDto } from '../../action-timeline/dtos/action-dto';

export interface ResourceActionDto extends ActionDto {
  amount: number;
}
