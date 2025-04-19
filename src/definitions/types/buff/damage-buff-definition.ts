import type { BuffSource } from "../../../models/buff/buff-source";
import type { BuffDefinition } from "./buff-definition";

export interface DamageBuffDefinition extends BuffDefinition {
  source: BuffSource;
}
