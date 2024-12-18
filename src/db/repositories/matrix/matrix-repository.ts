import { getMatrixDefinition } from "../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../definitions/matrices/matrix-type";
import type { Id } from "../../../models/identifiable";
import { Matrix } from "../../../models/matrix/matrix";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { MatrixDto } from "./dtos/matrix-dto";

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
    const { id, characterId, type, definitionId, stars } = item;
    return {
      id,
      characterId,
      typeId: type.id,
      definitionId,
      stars,
      version: 1,
    };
  }

  protected override dtoToItem(dto: MatrixDto): Matrix {
    const { id, characterId, typeId, definitionId, stars } = dto;

    const matrix = new Matrix(
      getMatrixType(typeId),
      getMatrixDefinition(definitionId),
      characterId,
      id,
    );
    matrix.stars = stars;

    return matrix;
  }
}
