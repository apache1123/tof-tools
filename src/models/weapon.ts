import type { WeaponName } from '../constants/weapons/weapon-definitions';
import type { Dto } from './dto';
import type { Persistable } from './persistable';
import type { AttackDefinition } from './v4/attack/attack-definition';
import type { PlayerInputAttackDefinition } from './v4/weapon/weapon-attack-definition';
import type { WeaponStarRequirement } from './v4/weapon/weapon-star-requirement';
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

  public get displayName() {
    return this.definition.displayName;
  }

  public get allPlayerInputAttackDefinitions(): PlayerInputAttackDefinition[] {
    const { normalAttacks, dodgeAttacks, skills, discharge } = this.definition;
    return [...normalAttacks, ...dodgeAttacks, ...skills, discharge].filter(
      (attackDefinition) =>
        this.hasMetStarRequirement(attackDefinition.starRequirement)
    );
  }

  public get allTriggeredAttackDefinitions(): AttackDefinition[] {
    return this.definition.triggeredAttacks.filter((attackDefinition) =>
      this.hasMetStarRequirement(attackDefinition.starRequirement)
    );
  }

  /** Buffs that can be activated for this weapon */
  public get buffs() {
    return this.definition.buffs.filter((buffDefinition) =>
      this.hasMetStarRequirement(buffDefinition.starRequirement)
    );
  }

  public get damageElement() {
    return this.definition.damageElement;
  }

  public get calculationElements() {
    return this.definition.calculationElements;
  }

  public get type() {
    return this.definition.type;
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

  private hasMetStarRequirement(requirement: WeaponStarRequirement) {
    return (
      this.stars >= requirement.minStarRequirement &&
      this.stars <= requirement.maxStarRequirement
    );
  }
}

export interface WeaponDto extends Dto {
  definitionId: WeaponName;
  stars: number;
  matrixSets: WeaponMatrixSetsDto;
  version: 1;
}
