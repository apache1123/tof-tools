import type { BuffId } from "../../../definitions/types/buff/buff-ability-definition";
import type { CritDamageBuffDefinition as CritDamageBuffDefinition } from "../../../definitions/types/buff/crit-damage-buff-definition";
import type { Buff } from "../buff";

export class CritDamageBuff implements Buff {
  public constructor(
    public readonly id: BuffId,
    public readonly value: number,
  ) {}

  public static create(
    critDamageBuffDef: CritDamageBuffDefinition,
    id: BuffId,
  ): CritDamageBuff {
    return new CritDamageBuff(id, critDamageBuffDef.value);
  }
}
