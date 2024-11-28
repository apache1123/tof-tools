import type { CoreElementalType } from "../../definitions/elemental-type";
import type { DataById } from "../../models/data";
import type { Dto } from "../../models/dto";
import type { TeamDtoV1 } from "../../models/team/team";

/** @deprecated Migrated to Loadouts */
export interface TeamsStateDto extends Dto {
  teamsByElement: DataById<CoreElementalType, TeamDtoV1>;
  version: 1;
}
