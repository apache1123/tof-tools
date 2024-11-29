import type { Dto } from "../../dto";

export interface TimeIntervalDto extends Dto {
  startTime: number;
  endTime: number;
  duration: number;
}
