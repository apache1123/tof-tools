import type { BuffId } from "../../../../definitions/types/buff/buff-ability";
import type { CritRateBuff as CritRateBuffDefinition } from "../../../../definitions/types/buff/crit-rate-buff";
import { Buff } from "../buff";

export class CritRateBuff extends Buff {
  public static create(
    critRateBuffDef: CritRateBuffDefinition,
    id: BuffId,
  ): CritRateBuff {
    return new CritRateBuff(id, critRateBuffDef.value);
  }

  public override canApplyTo(): boolean {
    return true;
  }
}
