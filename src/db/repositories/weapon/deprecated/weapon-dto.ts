import type { WeaponName } from "../../../../definitions/weapons/weapon-definitions";
import type { WeaponMatrixSetsDto } from "../../../../models/deprecated/weapon-matrix-sets";
import type { Dto } from "../../../repository/dto";

/** @deprecated Weapon must now belong to a character and does not contain matrices */
export interface WeaponDtoV1 extends Dto {
  definitionId: WeaponName;
  stars: number;
  matrixSets: WeaponMatrixSetsDto;
  version: 1;
}
