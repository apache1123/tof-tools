import type { DamageBuffDefinition } from "./damage-buff-definition";
import type { ElementalBuffDefinition } from "./elemental-buff-definition";

export type ElementalDamageBuffDefinition = ElementalBuffDefinition &
  DamageBuffDefinition;
