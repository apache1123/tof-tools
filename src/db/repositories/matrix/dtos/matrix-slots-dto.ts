import type { Matrix } from "../../../../models/matrix/matrix";
import { MatrixSlots } from "../../../../models/matrix/matrix-slots";
import type { MatrixTypeId } from "../../../../models/matrix/matrix-type";
import type { Repository } from "../../../repository/types/repository";
import type { MatrixSlotDto } from "./matrix-slot-dto";
import { dtoToMatrixSlot, matrixSlotToDto } from "./matrix-slot-dto";

export type MatrixSlotsDto = Record<MatrixTypeId, MatrixSlotDto>;

export function matrixSlotsToDto(matrixSlots: MatrixSlots): MatrixSlotsDto {
  return {
    mind: matrixSlotToDto(matrixSlots.getSlot("mind")),
    memory: matrixSlotToDto(matrixSlots.getSlot("memory")),
    belief: matrixSlotToDto(matrixSlots.getSlot("belief")),
    emotion: matrixSlotToDto(matrixSlots.getSlot("emotion")),
  };
}

export function dtoToMatrixSlots(
  dto: MatrixSlotsDto,
  matrixRepository: Repository<Matrix>,
): MatrixSlots {
  const { mind, memory, belief, emotion } = dto;
  return new MatrixSlots({
    mind: dtoToMatrixSlot(mind, matrixRepository),
    memory: dtoToMatrixSlot(memory, matrixRepository),
    belief: dtoToMatrixSlot(belief, matrixRepository),
    emotion: dtoToMatrixSlot(emotion, matrixRepository),
  });
}
