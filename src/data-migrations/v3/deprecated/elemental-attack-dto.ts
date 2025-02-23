import type { Dto } from "../../../db/repository/dto";

/** @deprecated Removed in v4 rewrite */
export interface ElementalAttackDtoV3 extends Dto {
  baseAttack: number;
  totalAttack: number;
  version: 1;
}
