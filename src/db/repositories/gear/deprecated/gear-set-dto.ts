import type { CoreElementalType } from "../../../../definitions/elemental-type";
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

/** @deprecated Name, ElementalType moved to Loadout */
export interface GearSetDtoV1 extends Dto {
  id: string;
  name: string;
  gearsByTypeId: DataById<GearTypeId, GearDtoV1>;
  elementalType: CoreElementalType | undefined;
  version: 1;
}
