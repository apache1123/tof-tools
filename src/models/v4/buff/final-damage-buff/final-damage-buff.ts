import type { BuffId } from "../../../../definitions/types/buff/buff-ability";
import type { FinalDamageBuff as FinalDamageBuffDefinition } from "../../../../definitions/types/buff/final-damage-buff";
import type { BuffSource } from "../buff-source";
import { DamageBuff } from "../damage-buff/damage-buff";

export class FinalDamageBuff extends DamageBuff {
  public static create(
    definition: FinalDamageBuffDefinition,
    id: BuffId,
    source: BuffSource,
  ): FinalDamageBuff {
    return new FinalDamageBuff(
      id,
      definition.value,
      source,
      definition.restrictedTo ?? {},
    );
  }
}
