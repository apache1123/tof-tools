import type { Dto } from "../../../dto";
import type { AbilityDto } from "./ability-dto";

export interface AbilityRegistryDto extends Dto {
  items: AbilityDto[];
}
