import type { WeaponName } from '../../../constants/weapons/weapon-definitions';
import type { LoadoutDto } from '../../loadout';
import type { AttackDto } from '../attack/dtos/attack-dto';
import type { BuffDto } from '../buff/dtos/buff-dto';
import type { DamageSummaryDto } from '../damage-summary/dtos/damage-summary-dto';
import type { ResourceDto } from '../resource/dtos/resource-dto';

export interface CombatSimulatorSnapshot {
  loadout: LoadoutDto;
  weaponAttacks: WeaponAttackSnapshot[];
  triggeredAttacks: AttackDto[];
  buffs: BuffDto[];
  resources: ResourceDto[];
  damageSummary: DamageSummaryDto | undefined;
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
