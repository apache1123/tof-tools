import type { Dto } from "../../../db/repository/dto";
import type { ResourceDto } from "./resource-dto";

export interface ResourceRegistryDto extends Dto {
  resources: ResourceDto[];
}
