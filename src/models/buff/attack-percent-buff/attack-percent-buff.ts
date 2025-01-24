import type { WeaponElementalType } from "../../../definitions/elemental-type";
import type { AttackPercentBuffDefinition } from "../../../definitions/types/buff/attack-percent-buff-definition";
import type { BuffId } from "../../../definitions/types/buff/buff-ability-definition";
import type { ElementalBuff } from "../elemental-buff";

export class AttackPercentBuff implements ElementalBuff {
  public constructor(
    public readonly id: BuffId,
    public readonly value: number,
    public readonly elementalType: WeaponElementalType,
  ) {}

  public static create(
    definition: AttackPercentBuffDefinition,
    id: BuffId,
  ): AttackPercentBuff[] {
    return definition.elementalTypes.map(
      (elementalType) =>
        new AttackPercentBuff(id, definition.value, elementalType),
    );
  }
}
