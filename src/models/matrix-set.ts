import type { MatrixSetName } from './matrix-set-definition';
import {
  getMatrixSetDefinition,
  type MatrixSetDefinition,
} from './matrix-set-definition';
import type { Persistable } from './persistable';

export class MatrixSet implements Persistable<MatrixSetDto> {
  public definition: MatrixSetDefinition;
  public stars: number;

  public constructor(definition: MatrixSetDefinition) {
    this.definition = definition;
    this.stars = 0;
  }

  public copyFromDto(dto: MatrixSetDto): void {
    const { definitionId, stars } = dto;

    this.definition = getMatrixSetDefinition(definitionId);
    this.stars = stars;
  }

  public toDto(): MatrixSetDto {
    const { definition, stars } = this;

    return {
      definitionId: definition.id,
      stars,
    };
  }
}

export interface MatrixSetDto {
  definitionId: MatrixSetName;
  stars: number;
}
