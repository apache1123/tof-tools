import type { Dto } from "../../../db/repository/dto";

export interface TimelineEventDto extends Dto {
  startTime: number;
  endTime: number;
  duration: number;
}
