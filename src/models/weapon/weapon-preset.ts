import { nanoid } from "nanoid";

import type { WeaponDefinition } from "../../definitions/types/weapon/weapon-definition";
import { maxNumOfWeaponStars } from "../../definitions/weapons/weapon-stars";
import type { CharacterId } from "../character/character-data";
import type { Id } from "../identifiable";
import { MatrixSlots } from "../matrix/matrix-slots";

export type WeaponPresetId = Id;

/** A preset for a weapon in a character's inventory. Used to create an instance of a weapon during combat */
export class WeaponPreset {
  public constructor(
    characterId: CharacterId,
    definition: WeaponDefinition,
    id?: WeaponPresetId,
    matrixSlots?: MatrixSlots,
  ) {
    this.id = id ?? nanoid();
    this.characterId = characterId;
    this.definition = definition;
    this.matrixSlots = matrixSlots ?? new MatrixSlots();
    this._stars = 0;
  }

  public readonly id: WeaponPresetId;
  public readonly characterId: CharacterId;
  public readonly definition: WeaponDefinition;
  public readonly matrixSlots: MatrixSlots;
  private _stars: number;

  public get stars() {
    return this._stars;
  }

  public set stars(value: number) {
    this._stars = Math.min(Math.max(Math.floor(value), 0), maxNumOfWeaponStars);
  }
}
