import type { BuffAbility } from "../../../definitions/types/buff/buff-ability";

export interface RelicBuffDefinition extends BuffAbility {
  minStarRequirement: number;
  maxStarRequirement: number;
}
