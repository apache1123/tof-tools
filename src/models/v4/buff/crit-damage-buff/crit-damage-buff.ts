import type { BuffId } from "../../../../definitions/types/buff/buff-ability";
import type { CritDamageBuff as CritDamageBuffDefinition } from "../../../../definitions/types/buff/crit-damage-buff";
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
