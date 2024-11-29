import type { AttackType } from "../../definitions/attack-type";
import type { WeaponElementalType } from "../../definitions/elemental-type";
import type { WeaponName } from "../../definitions/weapons/weapon-definitions";
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
  ) {
    super(timeInterval);
  }
}
