import type { ElementalType } from "../../elemental-type";
import type { BuffDefinition } from "./buff-definition";

export interface ElementalBuffDefinition extends BuffDefinition {
  elementalTypes: ElementalType[];
}
