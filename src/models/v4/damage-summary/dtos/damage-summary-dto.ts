import type { WeaponName } from "../../../../definitions/weapons/weapon-definitions";
import type { Dto } from "../../../dto";
import type { DamageDto } from "./damage-dto";
import type { WeaponDamageSummaryDto } from "./weapon-damage-summary-dto";

export interface DamageSummaryDto extends Dto {
  totalDamage: DamageDto;
  damageByWeapon: DamageByWeaponDto[];
  duration: number;
}

interface DamageByWeaponDto extends WeaponDamageSummaryDto {
  weaponName: WeaponName;
  percentageOfTotalDamage: number;
}
