import type { GearSetDtoV2 } from "../../db/repositories/gear/deprecated/gear-set-dto";
import type { TeamDtoV1 } from "../../db/repositories/team/deprecated/team-dto";
import type { Dto } from "../../db/repository/dto";
import type { CoreElementalType } from "../../definitions/elemental-type";
import type { SimulacrumId } from "../../definitions/simulacra/simulacrum-id";
import type { LoadoutStatsDto } from "../deprecated/loadout-stats";

/** @deprecated */
export interface LoadoutDtoV1 extends Dto {
  id: string;
  name: string;
  elementalType: CoreElementalType;
  team: TeamDtoV1;
  gearSet: GearSetDtoV2;
  loadoutStats: LoadoutStatsDto;
  simulacrumTraitId: SimulacrumId | undefined;
  version: 1;
}
