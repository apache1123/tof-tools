import type { BuffSource } from "../../../models/buff/buff-source";
import type { BuffAbilityDefinition } from "./buff-ability-definition";
import type { PartialElementalDamageBuffDefinition } from "./partial-elemental-damage-buff-definition";
import type { PartialFinalDamageBuffDefinition } from "./partial-final-damage-buff-definition";

export type PartialBuffAbilityDefinition = Omit<
  BuffAbilityDefinition,
  "elementalDamageBuffs" | "finalDamageBuffs"
> & {
  elementalDamageBuffs?: PartialElementalDamageBuffDefinition[];
  finalDamageBuffs?: PartialFinalDamageBuffDefinition[];
};

export function mapToFullBuffAbilityDefinition(
  partial: PartialBuffAbilityDefinition,
  buffSource: BuffSource,
): BuffAbilityDefinition {
  return {
    ...partial,
    elementalDamageBuffs: partial.elementalDamageBuffs?.map((buff) => ({
      ...buff,
      source: buffSource,
    })),
    finalDamageBuffs: partial.finalDamageBuffs?.map((buff) => ({
      ...buff,
      source: buffSource,
    })),
  };
}
