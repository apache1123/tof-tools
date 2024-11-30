import { getMatrixDefinition } from "../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../definitions/matrices/matrix-type";
import type { MatrixDto } from "../../models/matrix/matrix";
import { Matrix } from "../../models/matrix/matrix";
import type { CharactersState } from "../characters/characters-state";
import { PersistableRepository } from "../repository/persistable-repository";

export class MatricesState extends PersistableRepository<Matrix, MatrixDto> {
  public constructor(private readonly charactersState: CharactersState) {
    super();
  }

  public getCurrentCharacterMatrices(): Matrix[] {
    return this.items.filter(
      (matrix) => matrix.characterId === this.charactersState.selected?.id,
    );
  }

  protected override createItemFromDto(itemDto: MatrixDto): Matrix {
    const { typeId, definitionId, characterId } = itemDto;
    return new Matrix(
      getMatrixType(typeId),
      getMatrixDefinition(definitionId),
      characterId,
    );
  }
}
