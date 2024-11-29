import type { AttackAbilityDefinition } from "../../definitions/types/attack/attack-ability-definition";
import {
  getWeaponDefinition,
  type WeaponDefinition,
} from "../../definitions/types/weapon/weapon-definition";
import type { WeaponName } from "../../definitions/weapons/weapon-definitions";
import { maxNumOfWeaponStars } from "../../definitions/weapons/weapon-stars";
import type { CharacterId } from "../character/character";
import type { Dto } from "../dto";
import type { Persistable } from "../persistable";
import { hasMetStarRequirement } from "../star-requirement";
import type { WeaponMatrixSetsDto } from "../weapon-matrix-sets";
import type { WeaponStarRequirement } from "./weapon-star-requirement";

/** A weapon a character owns */
export class Weapon implements Persistable<WeaponDtoV2> {
  public constructor(definition: WeaponDefinition, characterId: CharacterId) {
    this._characterId = characterId;
    this.definition = definition;
    this._stars = 0;
  }

  private _characterId: CharacterId;
  private definition: WeaponDefinition;
  private _stars: number;

  public get id() {
    return this.definition.id;
  }

  public get characterId(): CharacterId {
    return this._characterId;
  }

  public get simulacrumDisplayName() {
    return this.definition.simulacrumDisplayName;
  }

  public get weaponDisplayName() {
    return this.definition.weaponDisplayName;
  }

  public get iconWeaponName() {
    return this.definition.iconWeaponName;
  }

  public get stars() {
    return this._stars;
  }
  public set stars(value: number) {
    this._stars = Math.min(Math.max(Math.floor(value), 0), maxNumOfWeaponStars);
  }

  public get attackDefinitions(): AttackAbilityDefinition[] {
    const { normalAttacks, dodgeAttacks, skills, discharges } = this.definition;
    return [...normalAttacks, ...dodgeAttacks, ...skills, ...discharges].filter(
      (attackDefinition) =>
        this.hasMetStarRequirement(attackDefinition.starRequirement),
    );
  }

  /** Buffs that can be activated for this weapon */
  public get buffDefinitions() {
    return this.definition.buffs.filter((buffDefinition) =>
      this.hasMetStarRequirement(buffDefinition.starRequirement),
    );
  }

  public get damageElement() {
    return this.definition.damageElement;
  }

  public get resonanceElements() {
    return this.definition.resonanceElements;
  }

  public get gearCalculationElements() {
    return this.definition.gearResonanceElements;
  }

  public get type() {
    return this.definition.type;
  }

  public get elementalIcon() {
    return this.definition.elementalIcon;
  }

  /** Resources that can be activated for this weapon */
  public get resourceDefinitions() {
    return this.definition.resources.filter((resourceDefinition) =>
      this.hasMetStarRequirement(resourceDefinition.starRequirement),
    );
  }

  public copyFromDto(dto: WeaponDtoV2): void {
    const { definitionId, characterId, stars } = dto;

    this.definition = getWeaponDefinition(definitionId);
    this._characterId = characterId;
    this.stars = stars;
  }

  public toDto(): WeaponDtoV2 {
    const { definition, characterId, stars } = this;

    return {
      definitionId: definition.id,
      characterId,
      stars,
      version: 2,
    };
  }

  private hasMetStarRequirement(requirement: WeaponStarRequirement) {
    return hasMetStarRequirement(requirement, this.stars);
  }
}

export interface WeaponDtoV2 extends Dto {
  definitionId: WeaponName;
  characterId: string;
  stars: number;
  version: 2;
}

/** @deprecated Weapon must now belong to a character and does not contain matrices */
export interface WeaponDtoV1 extends Dto {
  definitionId: WeaponName;
  stars: number;
  matrixSets: WeaponMatrixSetsDto;
  version: 1;
}
