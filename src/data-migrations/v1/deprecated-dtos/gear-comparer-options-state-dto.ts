import type { Dto } from "../../../db/repository/dto";
import type { CoreElementalType } from "../../../definitions/elemental-type";

/** @deprecated Migrated when switching to Loadouts */
export interface GearComparerOptionsStateDtoV1 extends Dto {
  selectedElementalType: CoreElementalType | undefined;
  version: 1;
}
