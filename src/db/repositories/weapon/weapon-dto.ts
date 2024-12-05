import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import type { Dto } from "../../repository/dto";

export interface WeaponDtoV2 extends Dto {
  definitionId: WeaponName;
  characterId: string;
  stars: number;
  version: 2;
}
