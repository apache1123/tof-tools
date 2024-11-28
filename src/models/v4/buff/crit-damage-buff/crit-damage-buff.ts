import type { BuffId } from "../../../../definitions/types/buff/buff-ability-definition";
import type { CritDamageBuffDefinition as CritDamageBuffDefinition } from "../../../../definitions/types/buff/crit-damage-buff-definition";
import { Buff } from "../buff";

export class CritDamageBuff extends Buff {
  public static create(
    critDamageBuffDef: CritDamageBuffDefinition,
    id: BuffId,
  ): CritDamageBuff {
    return new CritDamageBuff(id, critDamageBuffDef.value);
  }

  public override canApplyTo(): boolean {
    return true;
  }
}
