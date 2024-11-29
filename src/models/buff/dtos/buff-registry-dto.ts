import type { AbilityRegistryDto } from "../../ability/dtos/ability-registry-dto";
import type { BuffDto } from "./buff-dto";

export interface BuffRegistryDto extends AbilityRegistryDto {
  items: BuffDto[];
}
