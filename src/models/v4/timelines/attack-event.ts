import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { Weapon } from '../../weapon';
import type { Attack } from '../attacks/attack';
import type { AttackCommand } from '../attacks/attack-command';
import type { AttackDefinition } from '../attacks/attack-definition';
import { TimelineEvent } from './timeline-event';

export class AttackEvent extends TimelineEvent implements Attack {
  public readonly weapon: Weapon;
  public readonly attackDefinition: AttackDefinition;
  public elementalType: WeaponElementalType;
  public cooldown: number;

  public constructor(public startTime: number, attackCommand: AttackCommand) {
    const { weapon, attackDefinition } = attackCommand;
    super(startTime, attackDefinition.duration);

    this.weapon = weapon;
    this.attackDefinition = attackDefinition;
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
