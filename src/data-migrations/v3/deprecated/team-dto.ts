import type { Dto } from "../../../db/repository/dto";
import type { WeaponDtoV3 } from "./weapon-dto";
import type { WeaponSlotDtoV3 } from "./weapon-slot-dto";

/** @deprecated Deprecated during v4 rewrite */
export interface TeamDtoV3 extends Dto {
  weapon1: WeaponSlotDtoV3;
  weapon2: WeaponSlotDtoV3;
  weapon3: WeaponSlotDtoV3;
  weapons: WeaponDtoV3[];
  version: 1;
}
