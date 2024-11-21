import type { CoreElementalType } from "../../definitions/elemental-type";
import type { DataById } from "../../models/data";
import type { ElementalUserStatsDto } from "../../models/deprecated/elemental-user-stats";
import type { Dto } from "../../models/dto";

/** @deprecated Migrated to using Loadouts */
export interface UserStatsStateDtoV1 extends Dto {
  characterLevel: number;
  statsByElement: DataById<CoreElementalType, ElementalUserStatsDto>;
  version: 1;
}

/** @deprecated Migrated to `Character` */
export interface UserStatsStateDtoV2 extends Dto {
  characterLevel: number;
  version: 2;
}
