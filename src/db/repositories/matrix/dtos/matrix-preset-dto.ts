import type { Matrix } from "../../../../models/matrix/matrix";
import { MatrixPreset } from "../../../../models/matrix/matrix-preset";
import type { Dto } from "../../../repository/dto";
import type { Repository } from "../../../repository/types/repository";
import type { MatrixSlotsDto } from "./matrix-slots-dto";
import { dtoToMatrixSlots, matrixSlotsToDto } from "./matrix-slots-dto";

export interface MatrixPresetDto extends Dto {
  id: string;
  weaponId: string;
  matrixSlots: MatrixSlotsDto;
  version: 1;
}

export function matrixPresetToDto(matrixPreset: MatrixPreset): MatrixPresetDto {
  const { id, weaponId, matrixSlots } = matrixPreset;
  return {
    id,
    weaponId,
    matrixSlots: matrixSlotsToDto(matrixSlots),
    version: 1,
  };
}

export function dtoToMatrixPreset(
  dto: MatrixPresetDto,
  matrixRepository: Repository<Matrix>,
): MatrixPreset {
  const { id, weaponId, matrixSlots } = dto;
  return new MatrixPreset(
    weaponId,
    id,
    dtoToMatrixSlots(matrixSlots, matrixRepository),
  );
}
