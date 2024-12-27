import type { Matrix } from "../../../../models/matrix/matrix";
import { WeaponPreset } from "../../../../models/weapon/weapon-preset";
import type { Dto } from "../../../repository/dto";
import type { Repository } from "../../../repository/types/repository";
import type { MatrixSlotsDto } from "../../matrix/dtos/matrix-slots-dto";
import {
  dtoToMatrixSlots,
  matrixSlotsToDto,
} from "../../matrix/dtos/matrix-slots-dto";

export interface WeaponPresetDto extends Dto {
  id: string;
  weaponId: string;
  matrixSlots: MatrixSlotsDto;
  version: 1;
}

export function weaponPresetToDto(weaponPreset: WeaponPreset): WeaponPresetDto {
  const { id, weaponId, matrixSlots } = weaponPreset;
  return {
    id,
    weaponId,
    matrixSlots: matrixSlotsToDto(matrixSlots),
    version: 1,
  };
}

export function dtoToWeaponPreset(
  dto: WeaponPresetDto,
  matrixRepository: Repository<Matrix>,
): WeaponPreset {
  const { id, weaponId, matrixSlots } = dto;
  return new WeaponPreset(
    weaponId,
    id,
    dtoToMatrixSlots(matrixSlots, matrixRepository),
  );
}
