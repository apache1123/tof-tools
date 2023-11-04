import type { MatrixSetDto } from './matrix-set';
import { MatrixSet } from './matrix-set';
import type { MatrixSet4pcName } from './matrix-set-definition';
import {
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
      return [matrixSet2pc1, matrixSet2pc2].filter((x) => x) as MatrixSet[];
    } else {
      return [];
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
    };
  }
}

export interface WeaponMatrixSetsDto {
  matrixSet4pc: MatrixSetDto | undefined;
  matrixSet2pc1: MatrixSetDto | undefined;
  matrixSet2pc2: MatrixSetDto | undefined;
}
