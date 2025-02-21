import type { Dto } from "../../../db/repository/dto";
import type { LoadoutDtoV3 } from "./loadout-dto";

/** @deprecated */
export interface LoadoutListItemDtoV3 {
  loadout: LoadoutDtoV3;
  isDefault: boolean;
}

/** @deprecated */
export interface LoadoutsStateDtoV3 extends Dto {
  loadoutList: LoadoutListItemDtoV3[];
  selectedLoadoutIndex: number;
  version: 1;
}
