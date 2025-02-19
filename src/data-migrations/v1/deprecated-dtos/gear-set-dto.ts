import type { GearDtoV1 } from "../../../db/repositories/gear/deprecated/gear-dto";
import type { Dto } from "../../../db/repository/dto";
import type { CoreElementalType } from "../../../definitions/elemental-type";
import type { GearTypeId } from "../../../definitions/gear-types";
import type { DataById } from "../../../models/data";

/** @deprecated Name, ElementalType moved to Loadout */
export interface GearSetDtoV1 extends Dto {
  id: string;
  name: string;
  gearsByTypeId: DataById<GearTypeId, GearDtoV1>;
  elementalType: CoreElementalType | undefined;
  version: 1;
}
