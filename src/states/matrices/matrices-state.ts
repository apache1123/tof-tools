import { getMatrixDefinition } from "../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../definitions/matrices/matrix-type";
import type { MatrixDto } from "../../models/matrix/matrix";
import { Matrix } from "../../models/matrix/matrix";
import type { CharactersState } from "../characters/characters-state";
import { PersistableRepository } from "../repository/persistable-repository";
import type { MatrixFilter } from "./matrix-filter";

export class MatricesState extends PersistableRepository<Matrix, MatrixDto> {
  public constructor(private readonly charactersState: CharactersState) {
    super();
    this.filter = this.getFilterInitialState();
  }

  public filter: MatrixFilter;

  public getCurrentCharacterMatrices(): Matrix[] {
    return this.items.filter(
      (matrix) => matrix.characterId === this.charactersState.selected?.id,
    );
  }

  public getFilteredMatrices(): Matrix[] {
    const { definitions } = this.filter;
    return this.getCurrentCharacterMatrices().filter((matrix) => {
      return (
        definitions.length === 0 ||
        definitions
          .map((definition) => definition.id)
          .includes(matrix.definitionId)
      );
    });
  }

  public resetFilter() {
    this.filter = this.getFilterInitialState();
  }

  protected override createItemFromDto(itemDto: MatrixDto): Matrix {
    const { typeId, definitionId, characterId } = itemDto;
    return new Matrix(
      getMatrixType(typeId),
      getMatrixDefinition(definitionId),
      characterId,
    );
  }

  private getFilterInitialState(): MatrixFilter {
    return {
      definitions: [],
    };
  }
}
