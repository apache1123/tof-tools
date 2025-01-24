import type { BuffId } from "../../../definitions/types/buff/buff-ability-definition";
import type { CritRateBuffDefinition as CritRateBuffDefinition } from "../../../definitions/types/buff/crit-rate-buff-definition";
import type { Buff } from "../buff";

export class CritRateBuff implements Buff {
  public constructor(
    public readonly id: BuffId,
    public readonly value: number,
  ) {}

  public static create(
    critRateBuffDef: CritRateBuffDefinition,
    id: BuffId,
  ): CritRateBuff {
    return new CritRateBuff(id, critRateBuffDef.value);
  }
}
