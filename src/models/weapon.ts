import type { WeaponName } from '../constants/weapon-definitions';
import type { Persistable } from './persistable';
import {
  getWeaponDefinition,
  type WeaponDefinition,
} from './weapon-definition';
import type { WeaponMatrixSetsDTO } from './weapon-matrix-sets';
import { WeaponMatrixSets } from './weapon-matrix-sets';

export class Weapon implements Persistable<WeaponDTO> {
  public definition: WeaponDefinition;
  public stars: number;
  public matrixSets: WeaponMatrixSets;

  public constructor(definition: WeaponDefinition) {
    this.definition = definition;
    this.stars = 0;
    this.matrixSets = new WeaponMatrixSets();
  }

  public copyFromDTO(dto: WeaponDTO): void {
    const { definitionId, stars, matrixSets: matrixSetsDTO } = dto;

    this.definition = getWeaponDefinition(definitionId);
    this.stars = stars;

    const matrixSets = new WeaponMatrixSets();
    matrixSets.copyFromDTO(matrixSetsDTO);
    this.matrixSets = matrixSets;
  }

  public toDTO(): WeaponDTO {
    const { definition, stars, matrixSets } = this;

    return {
      definitionId: definition.id,
      stars,
      matrixSets: matrixSets.toDTO(),
    };
  }
}

export interface WeaponDTO {
  definitionId: WeaponName;
  stars: number;
  matrixSets: WeaponMatrixSetsDTO;
}
