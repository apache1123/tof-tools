import type { LoadoutDtoV3 } from "../../data-migrations/v3/deprecated/loadout-dto";
import type { WeaponDefinitionId } from "../../definitions/weapons/weapon-definitions";
import type { AttackDto } from "../attack/dtos/attack-dto";
import type { BuffDto } from "../buff/dtos/buff-dto";
import type { DamageSummaryDto } from "../damage-summary/dtos/damage-summary-dto";
import type { ResourceDto } from "../resource/dtos/resource-dto";

export interface CombatSimulatorSnapshot {
  loadout: LoadoutDtoV3;
  weaponAttacks: WeaponAttackSnapshot[];
  passiveAttacks: AttackDto[];
  buffs: BuffDto[];
  resources: ResourceDto[];
  damageSummary: DamageSummaryDto | undefined;
}

export interface WeaponAttackSnapshot {
  weaponId: WeaponDefinitionId;
  weaponDisplayName: string;
  attackTimeline: {
    events: {
      attackDisplayName: string;
      startTime: number;
      endTime: number;
    }[];
  };
}
