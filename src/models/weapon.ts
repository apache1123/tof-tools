import type { AttackAbility } from "../definitions/types/attack/attack-ability";
import {
  getWeaponDefinition,
  type Weapon as WeaponDefinition,
} from "../definitions/types/weapon/weapon";
import type { WeaponName } from "../definitions/weapons/weapon-definitions";
import type { Dto } from "./dto";
import type { Persistable } from "./persistable";
import { hasMetStarRequirement } from "./v4/star-requirement";
import type { WeaponStarRequirement } from "./v4/weapon/weapon-star-requirement";
import type { WeaponMatrixSetsDto } from "./weapon-matrix-sets";
import { WeaponMatrixSets } from "./weapon-matrix-sets";

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

  public get attackDefinitions(): AttackAbility[] {
    const { normalAttacks, dodgeAttacks, skills, discharges } = this.definition;
    return [...normalAttacks, ...dodgeAttacks, ...skills, ...discharges].filter(
      (attackDefinition) =>
        this.hasMetStarRequirement(attackDefinition.starRequirement),
    );
  }

  /** Buffs that can be activated for this weapon */
  public get buffs() {
    return this.definition.buffs.filter((buffDefinition) =>
      this.hasMetStarRequirement(buffDefinition.starRequirement),
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

  /** Resources that can be activated for this weapon */
  public get resources() {
    return this.definition.resources.filter((resourceDefinition) =>
      this.hasMetStarRequirement(resourceDefinition.starRequirement),
    );
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
    return hasMetStarRequirement(requirement, this.stars);
  }
}

export interface WeaponDto extends Dto {
  definitionId: WeaponName;
  stars: number;
  matrixSets: WeaponMatrixSetsDto;
  version: 1;
}
