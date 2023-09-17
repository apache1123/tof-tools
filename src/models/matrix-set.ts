import type { MatrixSetName } from './matrix-set-definition';
import {
  getMatrixSetDefinition,
  type MatrixSetDefinition,
} from './matrix-set-definition';
import type { Persistable } from './persistable';

export class MatrixSet implements Persistable<MatrixSetDTO> {
  public definition: MatrixSetDefinition;
  public stars: number;

  public constructor(definition: MatrixSetDefinition) {
    this.definition = definition;
    this.stars = 0;
  }

  public copyFromDTO(dto: MatrixSetDTO): void {
    const { definitionId, stars } = dto;

    this.definition = getMatrixSetDefinition(definitionId);
    this.stars = stars;
  }

  public toDTO(): MatrixSetDTO {
    const { definition, stars } = this;

    return {
      definitionId: definition.id,
      stars,
    };
  }
}

export interface MatrixSetDTO {
  definitionId: MatrixSetName;
  stars: number;
}
