import type { Dto } from "../../../db/repository/dto";
import type { ResourceTimelineDto } from "../../resource-timeline/dtos/resource-timeline-dto";

export interface ResourceDto extends Dto {
  id: string;
  displayName: string;
  timeline: ResourceTimelineDto;
}
