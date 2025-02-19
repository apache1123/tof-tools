import type { GearTypeId } from "../../../../definitions/gear-types";
import type { DataById } from "../../../../models/data";
import type { Dto } from "../../../repository/dto";
import type { GearDtoV1 } from "./gear-dto";

/** @deprecated Introduced gear slots and gear set presets */
export interface GearSetDtoV2 extends Dto {
  id: string;
  gearsByTypeId: DataById<GearTypeId, GearDtoV1>;
  version: 2;
}
