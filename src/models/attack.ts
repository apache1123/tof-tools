import type { AttackDefinition } from './attack-definition';
import type { Weapon } from './weapon';

export class Attack {
  public constructor(
    public readonly weapon: Weapon,
    public readonly definition: AttackDefinition,
    /** in ms */
    public readonly startTime: number
  ) {}

  /** in ms */
  public get endTime(): number {
    return this.startTime + this.definition.duration;
  }

  /** in ms */
  public get duration() {
    return this.definition.duration;
  }
}
