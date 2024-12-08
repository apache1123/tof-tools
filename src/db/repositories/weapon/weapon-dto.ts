import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import type { Dto } from "../../repository/dto";
import type { MatrixSlotsDto } from "../matrix/dtos/matrix-slots-dto";

export interface WeaponDtoV2 extends Dto {
  definitionId: WeaponName;
  characterId: string;
  stars: number;
  matrixSlots: MatrixSlotsDto;
  version: 2;
}
