import type { Dto } from "../../../db/repository/dto";
import type { WeaponDefinitionId } from "../../../definitions/weapons/weapon-definitions";
import type { DamageDto } from "./damage-dto";
import type { WeaponDamageSummaryDto } from "./weapon-damage-summary-dto";

export interface DamageSummaryDto extends Dto {
  totalDamage: DamageDto;
  damageByWeapon: DamageByWeaponDto[];
  duration: number;
}

interface DamageByWeaponDto extends WeaponDamageSummaryDto {
  weaponId: WeaponDefinitionId;
  percentageOfTotalDamage: number;
}
