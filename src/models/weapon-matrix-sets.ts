import type { MatrixSetDTO } from './matrix-set';
import { MatrixSet } from './matrix-set';
import type { MatrixSet4pcName } from './matrix-set-definition';
import {
  getMatrixSet4pcTo2pcName,
  getMatrixSetDefinition,
} from './matrix-set-definition';
import type { Persistable } from './persistable';

export class WeaponMatrixSets implements Persistable<WeaponMatrixSetsDTO> {
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

  public copyFromDTO(dto: WeaponMatrixSetsDTO): void {
    const {
      matrixSet4pc: matrixSet4pcDTO,
      matrixSet2pc1: matrixSet2pc1DTO,
      matrixSet2pc2: matrixSet2pc2DTO,
    } = dto;

    this._matrixSet4pc = matrixSet4pcDTO
      ? getMatrixSetFromDTO(matrixSet4pcDTO)
      : undefined;
    this._matrixSet2pc1 = matrixSet2pc1DTO
      ? getMatrixSetFromDTO(matrixSet2pc1DTO)
      : undefined;
    this._matrixSet2pc2 = matrixSet2pc2DTO
      ? getMatrixSetFromDTO(matrixSet2pc2DTO)
      : undefined;

    function getMatrixSetFromDTO(matrixSetDTO: MatrixSetDTO): MatrixSet {
      const matrixSet = new MatrixSet(
        getMatrixSetDefinition(matrixSetDTO.definitionId)
      );
      matrixSet.copyFromDTO(matrixSetDTO);
      return matrixSet;
    }
  }

  public toDTO(): WeaponMatrixSetsDTO {
    const { matrixSet4pc, matrixSet2pc1, matrixSet2pc2 } = this;

    return {
      matrixSet4pc: matrixSet4pc?.toDTO(),
      matrixSet2pc1: matrixSet2pc1?.toDTO(),
      matrixSet2pc2: matrixSet2pc2?.toDTO(),
    };
  }
}

export interface WeaponMatrixSetsDTO {
  matrixSet4pc: MatrixSetDTO | undefined;
  matrixSet2pc1: MatrixSetDTO | undefined;
  matrixSet2pc2: MatrixSetDTO | undefined;
}
