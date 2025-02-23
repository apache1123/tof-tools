import type { BuffSummaryItem } from "./buff-summary-item";

export interface BuffSummaryItemGroup {
  items: BuffSummaryItem[];
  totalValue: number;
}
