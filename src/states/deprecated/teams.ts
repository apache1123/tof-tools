import type { CoreElementalType } from '../../definitions/elemental-type';
import type { DataById } from '../../models/data';
import type { Dto } from '../../models/dto';
import type { TeamDto } from '../../models/team';

/** @deprecated Migrated to Loadouts */
export interface TeamsStateDto extends Dto {
  teamsByElement: DataById<CoreElementalType, TeamDto>;
  version: 1;
}
