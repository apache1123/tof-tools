import type { Dto } from "../../../db/repository/dto";
import type { CoreElementalType } from "../../../definitions/elemental-type";
import type { SimulacrumId } from "../../../definitions/simulacra/simulacrum-id";
import type { GearSetDtoV3 } from "./gear-set-dto";
import type { LoadoutStatsDtoV3 } from "./loadout-stats-dto";
import type { TeamDtoV3 } from "./team-dto";

/** @deprecated Deprecated during v4 rewrite */
export interface LoadoutDtoV3 extends Dto {
  id: string;
  name: string;
  elementalType: CoreElementalType;
  team: TeamDtoV3;
  gearSet: GearSetDtoV3;
  loadoutStats: LoadoutStatsDtoV3;
  simulacrumTraitId: SimulacrumId | undefined;
  version: 1;
}
