import { getMatrixType } from "../../../../definitions/matrices/matrix-type";
import type { Matrix } from "../../../../models/matrix/matrix";
import { MatrixSlot } from "../../../../models/matrix/matrix-slot";
import type { MatrixTypeId } from "../../../../models/matrix/matrix-type";
import { logException } from "../../../../utils/exception-utils";
import { ForeignKeyDeserializationError } from "../../../error/foreign-key-deserialization-error";
import type { Repository } from "../../../repository/types/repository";

export interface MatrixSlotDto {
  acceptsTypeId: MatrixTypeId;
  matrixId: string | undefined;
}

export function matrixSlotToDto(matrixSlot: MatrixSlot): MatrixSlotDto {
  const { acceptsType, matrix } = matrixSlot;
  return {
    acceptsTypeId: acceptsType.id,
    matrixId: matrix?.id,
  };
}

export function dtoToMatrixSlot(
  dto: MatrixSlotDto,
  matrixRepository: Repository<Matrix>,
): MatrixSlot {
  const { acceptsTypeId, matrixId } = dto;

  const matrixSlot = new MatrixSlot(getMatrixType(acceptsTypeId));

  if (matrixId) {
    const matrix = matrixRepository.find(matrixId);

    if (!matrix) {
      logException(
        new ForeignKeyDeserializationError(
          `Matrix with id ${matrixId} not found`,
          dto,
          matrixRepository,
        ),
      );
      return matrixSlot;
    }

    matrixSlot.matrix = matrix;
  }

  return matrixSlot;
}
