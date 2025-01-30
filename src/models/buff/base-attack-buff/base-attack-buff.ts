import type { WeaponElementalType } from "../../../definitions/elemental-type";
import type { BaseAttackBuffDefinition as BaseAttackBuffDefinition } from "../../../definitions/types/buff/base-attack-buff-definition";
import type { BuffId } from "../../../definitions/types/buff/buff-ability-definition";
import type { AttackHit } from "../../event/messages/attack-hit";
import type { ElementalBuff } from "../elemental-buff";

export class BaseAttackBuff implements ElementalBuff {
  public constructor(
    public readonly id: BuffId,
    public readonly value: number,
    public readonly elementalType: WeaponElementalType,
  ) {}

  public static create(
    definition: BaseAttackBuffDefinition,
    id: BuffId,
  ): BaseAttackBuff[] {
    return definition.elementalTypes.map(
      (element) => new BaseAttackBuff(id, definition.value, element),
    );
  }

  public canApplyTo(attackHit: AttackHit): boolean {
    return this.elementalType === attackHit.damageElement;
  }
}
