import { getMatrixDefinition } from "../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../definitions/matrices/matrix-type";
import { Matrix } from "../../../models/matrix/matrix";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { MatrixDto } from "./matrix-dto";

export class MatrixRepository extends ValtioRepository<Matrix, MatrixDto> {
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

    const character = this.db.get("characters").find(characterId);
    if (!character) {
      throw new Error(`Character not found for matrix ${id}`);
    }

    const matrix = new Matrix(
      getMatrixType(typeId),
      getMatrixDefinition(definitionId),
      character,
      id,
    );
    matrix.stars = stars;

    return matrix;
  }
}
