import type { WeaponElementalType } from "../../../../definitions/elemental-type";
import type { AttackBuff as AttackBuffDefinition } from "../../../../definitions/types/buff/attack-buff";
import type { BuffId } from "../../../../definitions/types/buff/buff-ability";
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
    definition: AttackBuffDefinition,
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
