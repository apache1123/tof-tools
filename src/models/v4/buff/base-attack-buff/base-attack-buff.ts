import type { WeaponElementalType } from "../../../../definitions/elemental-type";
import type { BaseAttackBuffDefinition as BaseAttackBuffDefinition } from "../../../../definitions/types/buff/base-attack-buff-definition";
import type { BuffId } from "../../../../definitions/types/buff/buff-ability-definition";
import type { AttackHit } from "../../event/messages/attack-hit";
import { Buff } from "../buff";

export class BaseAttackBuff extends Buff {
  public constructor(
    id: BuffId,
    value: number,
    public readonly elementalType: WeaponElementalType,
  ) {
    super(id, value);
  }

  public static create(
    definition: BaseAttackBuffDefinition,
    id: BuffId,
  ): BaseAttackBuff[] {
    return definition.elementalTypes.map(
      (element) => new BaseAttackBuff(id, definition.value, element),
    );
  }

  public override canApplyTo(attackHit: AttackHit): boolean {
    return this.elementalType === attackHit.damageElement;
  }
}
