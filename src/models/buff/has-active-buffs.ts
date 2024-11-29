import type { ActiveBuff } from "./active-buff/active-buff";

export interface HasActiveBuffs {
  getActiveBuffs(): ActiveBuff[];
}
