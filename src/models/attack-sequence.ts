import { Attack } from './attack';
import type { AttackDefinition } from './attack-definition';
import type { Weapon } from './weapon';

export class AttackSequence {
  private readonly _attacks: Attack[] = [];

  public get attacks(): ReadonlyArray<Attack> {
    return this._attacks;
  }

  public addAttack(weapon: Weapon, attackDefinition: AttackDefinition): void {
    const lastAttack = this._attacks.length
      ? this._attacks[this._attacks.length - 1]
      : undefined;
    const nextStartTime: number = lastAttack
      ? lastAttack.startTime + lastAttack.definition.duration
      : 0;
    this._attacks.push(new Attack(weapon, attackDefinition, nextStartTime));
  }
}
