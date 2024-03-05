import { TimelineEvent } from './timeline-event';
import type { WeaponAttackBuffDefinition } from './weapon-attack-buff-definition';

export class WeaponAttackBuffEvent extends TimelineEvent {
  public constructor(
    public readonly startTime: number,
    public readonly duration: number,
    public readonly weaponAttackBuffDefinition: WeaponAttackBuffDefinition,
    public readonly stacks = 1
  ) {
    super(startTime, duration);
  }
}
