import type { AttackId } from "../../../definitions/types/attack/attack-ability-definition";
import type { AbilityDto } from "../../ability/dtos/ability-dto";

export interface AttackDto extends AbilityDto {
  id: AttackId;
}
