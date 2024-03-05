import { TimelineEvent } from './timeline-event';
import type { WeaponDamageBuffDefinition } from './weapon-damage-buff-definition';

export class WeaponDamageBuffEvent extends TimelineEvent {
  public constructor(
    public readonly startTime: number,
    public readonly duration: number,
    public readonly damageBuffDefinition: WeaponDamageBuffDefinition,
    public readonly stacks = 1
  ) {
    super(startTime, duration);
  }
}
