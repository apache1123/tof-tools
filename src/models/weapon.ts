import type { WeaponName } from '../constants/weapon-definitions';
import type { Dto } from './dto';
import type { Persistable } from './persistable';
import type { AttackDefinition } from './v4/attack/attack-definition';
import {
  getWeaponDefinition,
  type WeaponDefinition,
} from './weapon-definition';
import type { WeaponMatrixSetsDto } from './weapon-matrix-sets';
import { WeaponMatrixSets } from './weapon-matrix-sets';

/** A weapon (with its equipped matrices) that exists within a `Team` */
export class Weapon implements Persistable<WeaponDto> {
  public definition: WeaponDefinition;
  public stars: number;
  public matrixSets: WeaponMatrixSets;

  public constructor(definition: WeaponDefinition) {
    this.definition = definition;
    this.stars = 0;
    this.matrixSets = new WeaponMatrixSets();
  }

  public get id() {
    return this.definition.id;
  }

  public get allAttackDefinitions(): AttackDefinition[] {
    // TODO: filter by star requirements
    const { normalAttacks, dodgeAttacks, skills, discharge } = this.definition;
    return [...normalAttacks, ...dodgeAttacks, ...skills, discharge];
  }

  public get calculationElements() {
    return this.definition.calculationElements;
  }

  public copyFromDto(dto: WeaponDto): void {
    const { definitionId, stars, matrixSets: matrixSetsDto } = dto;

    this.definition = getWeaponDefinition(definitionId);
    this.stars = stars;

    const matrixSets = new WeaponMatrixSets();
    matrixSets.copyFromDto(matrixSetsDto);
    this.matrixSets = matrixSets;
  }

  public toDto(): WeaponDto {
    const { definition, stars, matrixSets } = this;

    return {
      definitionId: definition.id,
      stars,
      matrixSets: matrixSets.toDto(),
      version: 1,
    };
  }
}

export interface WeaponDto extends Dto {
  definitionId: WeaponName;
  stars: number;
  matrixSets: WeaponMatrixSetsDto;
  version: 1;
}
