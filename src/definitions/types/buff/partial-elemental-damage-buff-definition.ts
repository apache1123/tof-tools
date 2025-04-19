import type { ElementalDamageBuffDefinition } from "./elemental-damage-buff-definition";

export type PartialElementalDamageBuffDefinition = Omit<
  ElementalDamageBuffDefinition,
  "source"
>;
