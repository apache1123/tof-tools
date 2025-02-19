import type { Dto } from "../../../db/repository/dto";
import type { Data } from "../../../models/data";
import type { GearSetDtoV1 } from "./gear-set-dto";

/** @deprecated GearSets replaced by Loadouts */
export interface GearSetsStateDtoV1 extends Dto {
  gearSets: Data<string, GearSetDtoV1>;
  selectedGearSetIndex: number;
  version: 1;
}
