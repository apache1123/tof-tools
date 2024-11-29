import { nanoid } from "nanoid";

import { maxCharacterLevel } from "../../definitions/character-level";
import type { Dto } from "../dto";
import type { Id } from "../identifiable";
import type { Persistable } from "../persistable";

export type CharacterId = Id;

/** Represent the game character's metadata, such as level, name, and inventory */
export class Character implements Persistable<CharacterDto> {
  public constructor() {
    this._id = nanoid();
    this.name = "";
    this._level = 0;
  }

  public name: string;
  private _id: CharacterId;
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

  public copyFromDto(dto: CharacterDto): void {
    const { id, name, level } = dto;
    this._id = id;
    this.name = name;
    this.level = level;
  }

  public toDto(): CharacterDto {
    const { id, name, level } = this;
    return { id, name, level, version: 1 };
  }
}

export interface CharacterDto extends Dto {
  id: string;
  name: string;
  level: number;
  version: 1;
}
