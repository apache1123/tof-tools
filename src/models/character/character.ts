import { nanoid } from "nanoid";

import { maxCharacterLevel } from "../../definitions/character-level";
import type { Id } from "../identifiable";

export type CharacterId = Id;

/** Represent the game character's metadata, such as level, name, and inventory */
export class Character {
  public constructor(id?: CharacterId) {
    this._id = id ?? nanoid();
    this.name = "";
    this._level = 0;
  }

  public name: string;
  private readonly _id: CharacterId;
  private _level: number;

  public get id(): CharacterId {
    return this._id;
  }

  public get level(): number {
    return this._level;
  }

  public set level(value: number) {
    // Make sure it's an integer between 0 and maxCharacterLevel
    this._level = Math.min(Math.max(Math.floor(value), 0), maxCharacterLevel);
  }
}
