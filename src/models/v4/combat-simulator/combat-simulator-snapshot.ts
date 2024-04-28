import type { WeaponName } from '../../../constants/weapon-definitions';
import type { AttackDto } from '../attack/dtos/attack-dto';
import type { BuffDto } from '../buff/dtos/buff-dto';
import type { CombatDamageSummaryDto } from '../combat-damage-summary/dtos/combat-damage-summary-dto';
import type { ResourceDto } from '../resource/dtos/resource-dto';

export interface CombatSimulatorSnapshot {
  weaponAttacks: WeaponAttackSnapshot[];
  triggeredAttacks: AttackDto[];
  buffs: BuffDto[];
  resources: ResourceDto[];
  combatDamageSummary: CombatDamageSummaryDto;
}

export interface WeaponAttackSnapshot {
  weaponId: WeaponName;
  weaponDisplayName: string;
  attackTimeline: {
    events: {
      attackDisplayName: string;
      startTime: number;
      endTime: number;
    }[];
  };
}
