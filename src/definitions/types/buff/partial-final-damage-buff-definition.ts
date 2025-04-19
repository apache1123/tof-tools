import type { FinalDamageBuffDefinition } from "./final-damage-buff-definition";

export type PartialFinalDamageBuffDefinition = Omit<FinalDamageBuffDefinition, "source">;