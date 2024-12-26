import type { Dto } from "../../../repository/dto";
import type { WeaponDtoV1 } from "../../weapon/deprecated/weapon-dto";
import type { WeaponSlotDtoV1 } from "../../weapon/deprecated/weapon-slot-dto";

/** @deprecated Deprecated during v4 rewrite */
export interface TeamDtoV1 extends Dto {
  weapon1: WeaponSlotDtoV1;
  weapon2: WeaponSlotDtoV1;
  weapon3: WeaponSlotDtoV1;
  weapons: WeaponDtoV1[];
  version: 1;
}
