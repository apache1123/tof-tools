import type { Dto } from '../../../dto';
import type { LoadoutDto } from '../../../loadout';
import type { AttackDto } from '../../attack/dtos/attack-dto';
import type { BuffDto } from '../../buff/dtos/buff-dto';
import type { DamageRecordDto } from '../../damage-record/dtos/damage-record-dto';
import type { ResourceDto } from '../../resource/dtos/resource-dto';

export interface CombatSimulatorDto extends Dto {
  loadout: LoadoutDto;
  activeAttacks: AttackDto[];
  passiveAttacks: AttackDto[];
  buffs: BuffDto[];
  resources: ResourceDto[];
  combatDamageSummary: DamageRecordDto;
}
