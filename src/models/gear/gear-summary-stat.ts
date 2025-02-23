import type { StatTypeElementalType } from "../../definitions/elemental-type";
import type { StatRole } from "../../definitions/stat-types";

export interface GearSummaryStat {
  role: StatRole;
  element: StatTypeElementalType;
  displayName: string;
  value: number;
  isPercentageBased: boolean;
}
