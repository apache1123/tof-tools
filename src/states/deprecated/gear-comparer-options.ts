import type { CoreElementalType } from "../../definitions/elemental-type";
import type { Dto } from "../../models/dto";

/** @deprecated Migrated when switching to Loadouts */
export interface GearComparerOptionsStateDto extends Dto {
  selectedElementalType: CoreElementalType | undefined;
  version: 1;
}
