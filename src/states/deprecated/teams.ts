import type { TeamDtoV1 } from "../../db/repositories/team/deprecated/team-dto";
import type { Dto } from "../../db/repository/dto";
import type { CoreElementalType } from "../../definitions/elemental-type";
import type { DataById } from "../../models/data";

/** @deprecated Migrated to Loadouts */
export interface TeamsStateDto extends Dto {
  teamsByElement: DataById<CoreElementalType, TeamDtoV1>;
  version: 1;
}
