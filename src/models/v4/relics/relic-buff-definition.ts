import type { BuffAbilityDefinition } from "../../../definitions/types/buff/buff-ability-definition";

export interface RelicBuffDefinition extends BuffAbilityDefinition {
  minStarRequirement: number;
  maxStarRequirement: number;
}
