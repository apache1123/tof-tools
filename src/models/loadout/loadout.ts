import type { GearSetDtoV2 } from "../../db/repositories/gear/deprecated/gear-set-dto";
import type { GearSetDto } from "../../db/repositories/gear/dtos/gear-set-dto";
import type { TeamDtoV1 } from "../../db/repositories/team/deprecated/team-dto";
import type { TeamDto } from "../../db/repositories/team/dtos/team-dto";
import type { Dto } from "../../db/repository/dto";
import type { CoreElementalType } from "../../definitions/elemental-type";
import type { SimulacrumName } from "../../definitions/simulacra/simulacrum-name";
import type { LoadoutStatsDto } from "../deprecated/loadout-stats";

export interface LoadoutDtoV2 extends Dto {
  id: string;
  characterId: string;
  name: string;
  team: TeamDto;
  gearSet: GearSetDto;
  simulacrumTraitId: SimulacrumName | undefined;
  version: 2;
}

/** @deprecated */
export interface LoadoutDtoV1 extends Dto {
  id: string;
  name: string;
  elementalType: CoreElementalType;
  team: TeamDtoV1;
  gearSet: GearSetDtoV2;
  loadoutStats: LoadoutStatsDto;
  simulacrumTraitId: SimulacrumName | undefined;
  version: 1;
}
