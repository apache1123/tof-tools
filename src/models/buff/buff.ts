import type { BuffId } from "../../definitions/types/buff/buff-ability-definition";

export interface Buff {
  readonly id: BuffId;
  readonly value: number;
}
