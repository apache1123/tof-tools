import type { WeaponName } from "../../definitions/weapons/weapon-definitions";
import type { AttackDto } from "../attack/dtos/attack-dto";
import type { BuffDto } from "../buff/dtos/buff-dto";
import type { DamageSummaryDto } from "../damage-summary/dtos/damage-summary-dto";
import type { LoadoutDtoV1 } from "../loadout/loadout";
import type { ResourceDto } from "../resource/dtos/resource-dto";

export interface CombatSimulatorSnapshot {
  loadout: LoadoutDtoV1;
  weaponAttacks: WeaponAttackSnapshot[];
  passiveAttacks: AttackDto[];
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
