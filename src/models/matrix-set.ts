import type { Dto } from './dto';
import type { MatrixSetName } from './matrix-set-definition';
import {
  getMatrixSetDefinition,
  type MatrixSetDefinition,
} from './matrix-set-definition';
import type { Persistable } from './persistable';
import type { BuffDefinition } from './v4/buff/buff-definition';
import { hasMetStarRequirement } from './v4/star-requirement';

export class MatrixSet implements Persistable<MatrixSetDto> {
  public definition: MatrixSetDefinition;
  public stars: number;

  public constructor(definition: MatrixSetDefinition) {
    this.definition = definition;
    this.stars = 0;
  }

  /** Buffs that can be activated for this matrix set, after filtering out buffs that do not meet the star requirement */
  public get buffs(): BuffDefinition[] {
    return this.definition.buffs.map<BuffDefinition>((buffDefinition) => ({
      ...buffDefinition,
      attackBuffs: [
        ...(buffDefinition?.attackBuffs ?? []),
        ...(buffDefinition.attackBuffsWithStarRequirement?.filter(
          (attackBuffWithStarRequirement) =>
            hasMetStarRequirement(attackBuffWithStarRequirement, this.stars)
        ) ?? []),
      ],
      damageBuffs: [
        ...(buffDefinition?.damageBuffs ?? []),
        ...(buffDefinition.damageBuffsWithStarRequirement?.filter(
          (damageBuffWithStarRequirement) =>
            hasMetStarRequirement(damageBuffWithStarRequirement, this.stars)
        ) ?? []),
      ],
    }));
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
      version: 1,
    };
  }
}

export interface MatrixSetDto extends Dto {
  definitionId: MatrixSetName;
  stars: number;
  version: 1;
}
