import type { BuffId } from "../../../definitions/types/buff/buff-ability-definition";
import type { FinalDamageBuffDefinition as FinalDamageBuffDefinition } from "../../../definitions/types/buff/final-damage-buff-definition";
import { DamageBuff } from "../damage-buff/damage-buff";

export class FinalDamageBuff extends DamageBuff {
  public static create(
    definition: FinalDamageBuffDefinition,
    id: BuffId,
  ): FinalDamageBuff {
    return new FinalDamageBuff(
      id,
      definition.value,
      definition.source,
      definition.restrictedTo ?? {},
    );
  }
}
