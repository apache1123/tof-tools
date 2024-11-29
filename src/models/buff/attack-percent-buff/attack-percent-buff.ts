import type { WeaponElementalType } from "../../../definitions/elemental-type";
import type { AttackPercentBuffDefinition } from "../../../definitions/types/buff/attack-percent-buff-definition";
import type { BuffId } from "../../../definitions/types/buff/buff-ability-definition";
import type { AttackHit } from "../../event/messages/attack-hit";
import { Buff } from "../buff";

export class AttackPercentBuff extends Buff {
  public constructor(
    id: BuffId,
    value: number,
    public readonly elementalType: WeaponElementalType,
  ) {
    super(id, value);
  }

  public static create(
    definition: AttackPercentBuffDefinition,
    id: BuffId,
  ): AttackPercentBuff[] {
    return definition.elementalTypes.map(
      (elementalType) =>
        new AttackPercentBuff(id, definition.value, elementalType),
    );
  }

  public override canApplyTo(attackHit: AttackHit): boolean {
    return this.elementalType === attackHit.damageElement;
  }
}
