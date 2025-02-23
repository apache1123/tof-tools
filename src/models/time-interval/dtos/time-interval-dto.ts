import type { Dto } from "../../../db/repository/dto";

export interface TimeIntervalDto extends Dto {
  startTime: number;
  endTime: number;
  duration: number;
}
