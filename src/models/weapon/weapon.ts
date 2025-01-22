import { nanoid } from "nanoid";

import type { AttackAbilityDefinition } from "../../definitions/types/attack/attack-ability-definition";
import { type WeaponDefinition } from "../../definitions/types/weapon/weapon-definition";
import { maxNumOfWeaponStars } from "../../definitions/weapons/weapon-stars";
import type { CharacterId } from "../character/character-data";
import type { Id } from "../identifiable";
import { MatrixSlots } from "../matrix/matrix-slots";
import { hasMetStarRequirement } from "../star-requirement";
import type { WeaponPreset } from "./weapon-preset";
import type { WeaponStarRequirement } from "./weapon-star-requirement";

export type WeaponId = Id;

/** A weapon a character owns */
export class Weapon {
  public constructor(
    definition: WeaponDefinition,
    characterId: CharacterId,
    id?: WeaponId,
    matrixSlots?: MatrixSlots,
  ) {
    this.id = id ?? nanoid();
    this.characterId = characterId;
    this.definition = definition;
    this._stars = 0;
    this.matrixSlots = matrixSlots ?? new MatrixSlots();
  }

  public readonly id: WeaponId;
  public readonly characterId: CharacterId;
  public readonly matrixSlots: MatrixSlots;
  private readonly definition: WeaponDefinition;
  private _stars: number;

  public get definitionId() {
    return this.definition.id;
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

  public get stars() {
    return this._stars;
  }

  public set stars(value: number) {
    this._stars = Math.min(Math.max(Math.floor(value), 0), maxNumOfWeaponStars);
  }

  public applyPreset(preset: WeaponPreset) {
    if (preset.weapon !== this) {
      throw new Error("Weapon preset does not match weapon");
    }

    this.matrixSlots.equipMatricesFrom(preset.matrixSlots);
  }

  private hasMetStarRequirement(requirement: WeaponStarRequirement) {
    return hasMetStarRequirement(requirement, this.stars);
  }
}
