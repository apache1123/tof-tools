import type { Dto } from "../../../db/repository/dto";
import type { CoreElementalType } from "../../../definitions/elemental-type";
import type { DataById } from "../../../models/data";
import type { ElementalUserStatsDtoV1 } from "./elemental-user-stats-dto";

/** @deprecated Migrated to using Loadouts */
export interface UserStatsStateDtoV1 extends Dto {
  characterLevel: number;
  statsByElement: DataById<CoreElementalType, ElementalUserStatsDtoV1>;
  version: 1;
}
