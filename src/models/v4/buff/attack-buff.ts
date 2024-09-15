import type { WeaponElementalType } from '../../../definitions/elemental-type';
import type { BuffId } from '../../../definitions/types/buff/buff-ability';
import type { AttackHit } from '../event/messages/attack-hit';
import { Buff } from './buff';

export class AttackBuff extends Buff {
  public constructor(
    id: BuffId,
    value: number,
    public readonly elementalType: WeaponElementalType
  ) {
    super(id, value);
  }

  public override canApplyTo(attackHit: AttackHit): boolean {
    return this.elementalType === attackHit.elementalType;
  }
}
