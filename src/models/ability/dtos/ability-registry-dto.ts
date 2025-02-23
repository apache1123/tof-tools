import type { Dto } from "../../../db/repository/dto";
import type { AbilityDto } from "./ability-dto";

export interface AbilityRegistryDto extends Dto {
  items: AbilityDto[];
}
