import type { BuffAbilityDefinition } from "../definitions/types/buff/buff-ability-definition";
import type { Dto } from "./dto";
import type { MatrixSetName } from "./matrix-set-definition";
import {
  getMatrixSetDefinition,
  type MatrixSetDefinition,
} from "./matrix-set-definition";
import type { Persistable } from "./persistable";

export class MatrixSet implements Persistable<MatrixSetDto> {
  public constructor(definition: MatrixSetDefinition) {
    this.definition = definition;
    this.stars = 0;
  }

  public definition: MatrixSetDefinition;
  public stars: number;

  public get definitionId() {
    return this.definition.id;
  }

  public get displayName() {
    return this.definition.displayName;
  }

  public get pieces() {
    return this.definition.pieces;
  }

  /** Buffs that can be activated for this matrix set, after filtering out buffs that do not meet the star requirement */
  public get buffs(): BuffAbilityDefinition[] {
    return this.definition.buffs.map<BuffAbilityDefinition>(
      (buffDefinition) => ({
        ...buffDefinition,
        attackPercentBuffs: [
          ...(buffDefinition.attackPercentBuffs ?? []),
          // ...(buffDefinition.attackBuffsWithStarRequirement?.filter(
          //   (attackBuffWithStarRequirement) =>
          //     hasMetStarRequirement(attackBuffWithStarRequirement, this.stars),
          // ) ?? []),
        ],
        // TODO: ? Other buffs?
        critDamageBuffs: [
          ...(buffDefinition.critDamageBuffs ?? []),
          // ...(buffDefinition.critDamageBuffsWithStarRequirement?.filter(
          //   (critDamageBuffWithStarRequirement) =>
          //     hasMetStarRequirement(
          //       critDamageBuffWithStarRequirement,
          //       this.stars,
          //     ),
          // ) ?? []),
        ],
      }),
    );
  }

  public copyFromDto(dto: MatrixSetDto): void {
    const { definitionId, stars } = dto;

    this.definition = getMatrixSetDefinition(definitionId);
    this.stars = stars;
  }

  public toDto(): MatrixSetDto {
    const { definitionId, stars } = this;

    return {
      definitionId,
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
