import type { Dto } from "../../../db/repository/dto";
import type { CoreElementalType } from "../../../definitions/elemental-type";
import type { DataById } from "../../../models/data";
import type { TeamDtoV3 } from "../../v3/deprecated/team-dto";

/** @deprecated Migrated to Loadouts */
export interface TeamsStateDtoV1 extends Dto {
  teamsByElement: DataById<CoreElementalType, TeamDtoV3>;
  version: 1;
}
