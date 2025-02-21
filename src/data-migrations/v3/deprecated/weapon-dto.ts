import type { Dto } from "../../../db/repository/dto";
import type { WeaponDefinitionId } from "../../../definitions/weapons/weapon-definitions";
import type { WeaponMatrixSetsDtoV3 } from "./weapon-matrix-sets-dto";

/** @deprecated Weapon must now belong to a character and does not contain matrices */
export interface WeaponDtoV3 extends Dto {
  definitionId: WeaponDefinitionId;
  stars: number;
  matrixSets: WeaponMatrixSetsDtoV3;
  version: 1;
}
