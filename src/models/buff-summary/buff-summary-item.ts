import type { BuffId } from "../../definitions/types/buff/buff-ability-definition";

export interface BuffSummaryItem {
  id: BuffId;
  displayName: string;
  description?: string;
  /** The total value of all stacks */
  totalValue: number;
  stacks: number;
}
