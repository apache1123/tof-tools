import type { Dto } from "../../../db/repository/dto";
import type { AttackDto } from "../../attack/dtos/attack-dto";
import type { BuffDto } from "../../buff/dtos/buff-dto";
import type { DamageRecordDto } from "../../damage-record/dtos/damage-record-dto";
import type { LoadoutDtoV1 } from "../../loadout/loadout";
import type { ResourceDto } from "../../resource/dtos/resource-dto";

export interface CombatSimulatorDto extends Dto {
  loadout: LoadoutDtoV1;
  activeAttacks: AttackDto[];
  passiveAttacks: AttackDto[];
  buffs: BuffDto[];
  resources: ResourceDto[];
  combatDamageSummary: DamageRecordDto;
}
