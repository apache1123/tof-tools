import { AttackSequence } from './attack-sequence';
import type { Loadout } from './loadout';

export class DamageSimulator {
  public readonly attackSequence: AttackSequence = new AttackSequence();

  public constructor(public readonly loadout: Loadout) {}
}
