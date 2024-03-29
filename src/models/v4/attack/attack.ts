import type { AttackType } from '../../../constants/attack-type';
import type { WeaponElementalType } from '../../../constants/elemental-type';
import { TimelineEvent } from '../timeline/timeline-event';
import type { AttackDamageModifiers } from './attack-definition';

export class Attack extends TimelineEvent {
  public constructor(
    public startTime: number,
    public duration: number,
    public cooldown: number,
    public elementalType: WeaponElementalType,
    public damageModifiers: AttackDamageModifiers,
    public type: AttackType
  ) {
    super(startTime, duration);
  }

  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }
}
