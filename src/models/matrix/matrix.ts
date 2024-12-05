import { nanoid } from "nanoid";

import { maxNumOfMatrixStars } from "../../definitions/matrices/matrix";
import type { MatrixDefinition } from "../../definitions/types/matrix/matrix-definition";
import type { Character } from "../character/character";
import type { Id } from "../identifiable";
import type { MatrixType } from "./matrix-type";

export type MatrixId = Id;

export class Matrix {
  public constructor(
    type: MatrixType,
    definition: MatrixDefinition,
    character: Character,
    id?: MatrixId,
  ) {
    this._id = id ?? nanoid();
    this._type = type;
    this.definition = definition;
    this._character = character;
    this._stars = 0;
  }

  private readonly _id: MatrixId;
  private readonly _character: Character;
  private readonly _type: MatrixType;
  private readonly definition: MatrixDefinition;
  private _stars: number;

  public get id() {
    return this._id;
  }

  public get characterId(): string {
    return this._character.id;
  }

  public get type(): MatrixType {
    return this._type;
  }

  public get definitionId() {
    return this.definition.id;
  }

  public get displayName() {
    return this.definition.displayName;
  }

  public get stars(): number {
    return this._stars;
  }
  public set stars(value: number) {
    this._stars = Math.min(Math.max(Math.floor(value), 0), maxNumOfMatrixStars);
  }
}
