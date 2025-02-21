import type { Dto } from "../../../db/repository/dto";
import type { GearTypeId } from "../../../definitions/gear-types";
import type { GearSetDtoV3 } from "./gear-set-dto";

/** @deprecated Removed in v4 rewrite */
export interface GearComparerStateDtoV3 extends Dto {
  selectedGearTypeId: GearTypeId;
  replacementGearGearSet: GearSetDtoV3;
  version: 1;
}
