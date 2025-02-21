import type { Dto } from "../../../db/repository/dto";
import type { CoreElementalType } from "../../../definitions/elemental-type";
import type { GearTypeId } from "../../../definitions/gear-types";
import type { DataById } from "../../../models/data";
import type { GearDtoV3 } from "../../v3/deprecated/gear-dto";

/** @deprecated Name, ElementalType moved to Loadout */
export interface GearSetDtoV1 extends Dto {
  id: string;
  name: string;
  gearsByTypeId: DataById<GearTypeId, GearDtoV3>;
  elementalType: CoreElementalType | undefined;
  version: 1;
}
