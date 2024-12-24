import type { Id } from "../../../models/identifiable";
import type { Matrix } from "../../../models/matrix/matrix";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { MatrixDto } from "./dtos/matrix-dto";
import { dtoToMatrix, matrixToDto } from "./dtos/matrix-dto";

export class MatrixRepository extends ValtioRepository<Matrix, MatrixDto> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(
    removedItemId: Id,
  ): void {
    // Remove the matrix from the weapon slots
    this.db.get("weapons").items.forEach((weapon) => {
      weapon.matrixSlots.getSlots().forEach((slot) => {
        if (slot.matrix?.id === removedItemId) {
          slot.matrix = undefined;
        }
      });
    });
  }

  protected override itemToDto(item: Matrix): MatrixDto {
    return matrixToDto(item);
  }

  protected override dtoToItem(dto: MatrixDto): Matrix {
    return dtoToMatrix(dto);
  }
}
