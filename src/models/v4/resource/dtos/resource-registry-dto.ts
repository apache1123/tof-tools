import type { Dto } from "../../../dto";
import type { ResourceDto } from "./resource-dto";

export interface ResourceRegistryDto extends Dto {
  resources: ResourceDto[];
}
