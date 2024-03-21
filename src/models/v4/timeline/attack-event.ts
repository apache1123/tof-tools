import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { Weapon } from '../../weapon';
import type { Attack } from '../attack';
import type { AttackDefinition } from '../attack-definition';
import { TimelineEvent } from './timeline-event';

export class AttackEvent extends TimelineEvent implements Attack {
  public elementalType: WeaponElementalType;
  public cooldown: number;

  public constructor(
    public startTime: number,
    public readonly weapon: Weapon,
    public readonly attackDefinition: AttackDefinition
  ) {
    super(startTime, attackDefinition.duration);

    this.elementalType = attackDefinition.elementalType;
    this.cooldown = attackDefinition.cooldown;
  }

  public get displayName() {
    return this.attackDefinition.displayName;
  }

  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }
}
