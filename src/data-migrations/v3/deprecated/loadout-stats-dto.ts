import type { Dto } from "../../../db/repository/dto";
import type { WeaponElementalType } from "../../../definitions/elemental-type";
import type { ElementalAttackDtoV3 } from "./elemental-attack-dto";

/** @deprecated Removed in v4 rewrite */
export interface LoadoutStatsDtoV3 extends Dto {
  flameAttack: ElementalAttackDtoV3;
  frostAttack: ElementalAttackDtoV3;
  physicalAttack: ElementalAttackDtoV3;
  voltAttack: ElementalAttackDtoV3;
  critFlat: number;
  critPercent: number;
  critDamage: number;
  hp: number;
  elementalResistances: Record<WeaponElementalType, number>;
  version: 1;
}
