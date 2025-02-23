import type { MatrixDefinitionId } from "../../../../definitions/matrices/matrix-definitions";
import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../../definitions/matrices/matrix-type";
import { Matrix } from "../../../../models/matrix/matrix";
import type { MatrixTypeId } from "../../../../models/matrix/matrix-type";

export interface MatrixDto {
  id: string;
  characterId: string;
  typeId: MatrixTypeId;
  definitionId: MatrixDefinitionId;
  stars: number;
}

export function matrixToDto(item: Matrix): MatrixDto {
  const { id, characterId, type, definitionId, stars } = item;
  return {
    id,
    characterId,
    typeId: type.id,
    definitionId,
    stars,
  };
}

export function dtoToMatrix(dto: MatrixDto) {
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
