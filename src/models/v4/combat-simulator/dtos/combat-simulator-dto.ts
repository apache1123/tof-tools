import type { Dto } from '../../../dto';
import type { LoadoutDto } from '../../../loadout';
import type { AttackDto } from '../../attack/dtos/attack-dto';
import type { BuffDto } from '../../buff/dtos/buff-dto';
import type { CombatDamageSummaryDto } from '../../combat-damage-summary/dtos/combat-damage-summary-dto';
import type { ResourceDto } from '../../resource/dtos/resource-dto';

export interface CombatSimulatorDto extends Dto {
  loadout: LoadoutDto;
  playerInputAttacks: AttackDto[];
  triggeredAttacks: AttackDto[];
  buffs: BuffDto[];
  resources: ResourceDto[];
  combatDamageSummary: CombatDamageSummaryDto;
}
