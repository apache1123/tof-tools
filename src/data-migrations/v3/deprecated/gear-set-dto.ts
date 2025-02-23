import type { Dto } from "../../../db/repository/dto";
import type { GearTypeId } from "../../../definitions/gear-types";
import type { DataById } from "../../../models/data";
import type { GearDtoV3 } from "./gear-dto";

/** @deprecated Introduced gear slots and gear set presets */
export interface GearSetDtoV3 extends Dto {
  id: string;
  gearsByTypeId: DataById<GearTypeId, GearDtoV3>;
  version: 2;
}
