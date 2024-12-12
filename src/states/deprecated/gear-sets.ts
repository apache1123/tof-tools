import type { Dto } from "../../db/repository/dto";
import type { Data } from "../../models/data";
import type { GearSetDtoV1 } from "../../models/gear/gear-set";

/** @deprecated GearSets replaced by Loadouts */
export interface GearSetsStateDto extends Dto {
  gearSets: Data<string, GearSetDtoV1>;
  selectedGearSetIndex: number;
  version: 1;
}
