import type {WeaponElementalType} from "../../definitions/elemental-type";
import type {Dto} from "../dto";
import type {ElementalAttackDto} from "../elemental-attack/elemental-attack";

/** @deprecated Merged into `Loadout` */
export interface LoadoutStatsDto extends Dto {
  flameAttack: ElementalAttackDto;
  frostAttack: ElementalAttackDto;
  physicalAttack: ElementalAttackDto;
  voltAttack: ElementalAttackDto;
  critFlat: number;
  critPercent: number;
  critDamage: number;
  hp: number;
  elementalResistances: Record<WeaponElementalType, number>;
  version: 1;
}
