import type { AttackType } from "../../definitions/attack-type";
import type { WeaponElementalType } from "../../definitions/elemental-type";
import type { WeaponName } from "../../definitions/weapons/weapon-definitions";
import type { AttackPercentBuff } from "../buff/attack-percent-buff/attack-percent-buff";
import type { BaseAttackBuff } from "../buff/base-attack-buff/base-attack-buff";
import type { CritDamageBuff } from "../buff/crit-damage-buff/crit-damage-buff";
import type { CritRateBuff } from "../buff/crit-rate-buff/crit-rate-buff";
import type { ElementalDamageBuff } from "../buff/elemental-damage-buff/elemental-damage-buff";
import type { FinalDamageBuff } from "../buff/final-damage-buff/final-damage-buff";
import type { Damage } from "../damage/damage";
import type { TimeInterval } from "../time-interval/time-interval";
import { TimelineEvent } from "../timeline/timeline-event";

export class DamageRecordEvent extends TimelineEvent {
  public constructor(
    timeInterval: TimeInterval,
    public readonly damage: Damage,
    public readonly attackType: AttackType,
    public readonly elementalType: WeaponElementalType,
    public readonly weaponId: WeaponName,
    public readonly baseAttackBuffs: BaseAttackBuff[],
    public readonly attackPercentBuffs: AttackPercentBuff[],
    public readonly elementalDamageBuffs: ElementalDamageBuff[],
    public readonly finalDamageBuffs: FinalDamageBuff[],
    public readonly critRateBuffs: CritRateBuff[],
    public readonly critDamageBuffs: CritDamageBuff[],
  ) {
    super(timeInterval);
  }
}
