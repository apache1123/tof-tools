import { nanoid } from "nanoid";

import { maxCharacterLevel } from "../../definitions/character-level";
import type { Id } from "../identifiable";

export type CharacterId = Id;

/** Represents the game character's data, such as level, name, and inventory (referenced via id) */
export class CharacterData {
  public constructor(id?: CharacterId) {
    this.id = id ?? nanoid();
    this.name = "";
    this._level = 0;
  }

  public readonly id: CharacterId;
  public name: string;
  private _level: number;

  public get level(): number {
    return this._level;
  }

  public set level(value: number) {
    // Make sure it's an integer between 0 and maxCharacterLevel
    this._level = Math.min(Math.max(Math.floor(value), 0), maxCharacterLevel);
  }
}
