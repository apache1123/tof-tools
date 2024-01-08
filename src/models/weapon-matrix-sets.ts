import type { Dto } from './dto';
import type { MatrixSetDto } from './matrix-set';
import { MatrixSet } from './matrix-set';
import type {
  MatrixSet2pcName,
  MatrixSet4pcName,
} from './matrix-set-definition';
import {
  getMatrixSet2pcTo4pcName,
  getMatrixSet4pcTo2pcName,
  getMatrixSetDefinition,
} from './matrix-set-definition';
import type { Persistable } from './persistable';

export class WeaponMatrixSets implements Persistable<WeaponMatrixSetsDto> {
  private _matrixSet4pc: MatrixSet | undefined;
  private _matrixSet2pc1: MatrixSet | undefined;
  private _matrixSet2pc2: MatrixSet | undefined;

  public get matrixSet4pc() {
    return this._matrixSet4pc;
  }
  public set matrixSet4pc(matrixSet: MatrixSet | undefined) {
    this._matrixSet4pc = matrixSet;
    this._matrixSet2pc1 = undefined;
    this._matrixSet2pc2 = undefined;
  }

  public get matrixSet2pc1() {
    return this._matrixSet2pc1;
  }
  public set matrixSet2pc1(matrixSet: MatrixSet | undefined) {
    this._matrixSet2pc1 = matrixSet;
    this._matrixSet4pc = undefined;
  }

  public get matrixSet2pc2() {
    return this._matrixSet2pc2;
  }
  public set matrixSet2pc2(matrixSet: MatrixSet | undefined) {
    this._matrixSet2pc2 = matrixSet;
    this._matrixSet4pc = undefined;
  }

  public getMatrixSets(): MatrixSet[] {
    const { matrixSet4pc, matrixSet2pc1, matrixSet2pc2 } = this;
    if (matrixSet4pc) {
      const counterpartMatrixSet2pcName = getMatrixSet4pcTo2pcName(
        matrixSet4pc.definition.id as MatrixSet4pcName
      );

      const counterpartMatrixSet2pc = new MatrixSet(
        getMatrixSetDefinition(counterpartMatrixSet2pcName)
      );
      counterpartMatrixSet2pc.stars = matrixSet4pc.stars;

      return [matrixSet4pc, counterpartMatrixSet2pc];
    } else if (matrixSet2pc1 || matrixSet2pc2) {
      // Both 2pc sets are of the same type, treat as a 2pc set of the highest star + a 4pc set of the lowest star
      if (
        matrixSet2pc1 &&
        matrixSet2pc2 &&
        matrixSet2pc1.definition.id === matrixSet2pc2.definition.id
      ) {
        const lowestStar =
          matrixSet2pc1.stars >= matrixSet2pc2.stars
            ? matrixSet2pc2.stars
            : matrixSet2pc1.stars;

        const highestStar2pcSet =
          matrixSet2pc1.stars >= matrixSet2pc2.stars
            ? matrixSet2pc1
            : matrixSet2pc2;

        const counterpartMatrixSet4pcName = getMatrixSet2pcTo4pcName(
          matrixSet2pc1.definition.id as MatrixSet2pcName
        );
        const counterpartMatrixSet4pc = new MatrixSet(
          getMatrixSetDefinition(counterpartMatrixSet4pcName)
        );
        counterpartMatrixSet4pc.stars = lowestStar;

        return [counterpartMatrixSet4pc, highestStar2pcSet];
      }

      return [matrixSet2pc1, matrixSet2pc2].filter((x) => x) as MatrixSet[];
    } else {
      return [];
    }
  }

  /** Checks if the two stored 2pc sets are of the same type & stars. If so, combine them into the counterpart 4pc set with same type & stars  */
  public combine2pcInto4pcIfPossible(): void {
    if (!this._matrixSet2pc1 || !this._matrixSet2pc2) return;
    if (this._matrixSet4pc) return;

    if (
      this._matrixSet2pc1.definition.id === this._matrixSet2pc2.definition.id &&
      this._matrixSet2pc1.stars === this._matrixSet2pc2.stars
    ) {
      const counterpart4pcName = getMatrixSet2pcTo4pcName(
        this._matrixSet2pc1.definition.id as MatrixSet2pcName
      );
      const counterpart4pcDefinition =
        getMatrixSetDefinition(counterpart4pcName);
      const stars = this._matrixSet2pc1.stars;

      this.matrixSet4pc = new MatrixSet(counterpart4pcDefinition);
      this.matrixSet4pc.stars = stars;

      this._matrixSet2pc1 = undefined;
      this._matrixSet2pc2 = undefined;
    }
  }

  public copyFromDto(dto: WeaponMatrixSetsDto): void {
    const {
      matrixSet4pc: matrixSet4pcDto,
      matrixSet2pc1: matrixSet2pc1Dto,
      matrixSet2pc2: matrixSet2pc2Dto,
    } = dto;

    this._matrixSet4pc = matrixSet4pcDto
      ? getMatrixSetFromDto(matrixSet4pcDto)
      : undefined;
    this._matrixSet2pc1 = matrixSet2pc1Dto
      ? getMatrixSetFromDto(matrixSet2pc1Dto)
      : undefined;
    this._matrixSet2pc2 = matrixSet2pc2Dto
      ? getMatrixSetFromDto(matrixSet2pc2Dto)
      : undefined;

    function getMatrixSetFromDto(matrixSetDto: MatrixSetDto): MatrixSet {
      const matrixSet = new MatrixSet(
        getMatrixSetDefinition(matrixSetDto.definitionId)
      );
      matrixSet.copyFromDto(matrixSetDto);
      return matrixSet;
    }
  }

  public toDto(): WeaponMatrixSetsDto {
    const { matrixSet4pc, matrixSet2pc1, matrixSet2pc2 } = this;

    return {
      matrixSet4pc: matrixSet4pc?.toDto(),
      matrixSet2pc1: matrixSet2pc1?.toDto(),
      matrixSet2pc2: matrixSet2pc2?.toDto(),
      version: 1,
    };
  }
}

export interface WeaponMatrixSetsDto extends Dto {
  matrixSet4pc: MatrixSetDto | undefined;
  matrixSet2pc1: MatrixSetDto | undefined;
  matrixSet2pc2: MatrixSetDto | undefined;
  version: 1;
}
