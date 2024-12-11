import { nanoid } from "nanoid";

import { maxNumOfMatrixStars } from "../../definitions/matrices/matrix";
import type { MatrixDefinition } from "../../definitions/types/matrix/matrix-definition";
import type { CharacterId } from "../character/character";
import type { Id } from "../identifiable";
import type { MatrixType } from "./matrix-type";

export type MatrixId = Id;

export class Matrix {
  public constructor(
    type: MatrixType,
    definition: MatrixDefinition,
    characterId: CharacterId,
    id?: MatrixId,
  ) {
    this.id = id ?? nanoid();
    this.type = type;
    this.definition = definition;
    this.characterId = characterId;
    this._stars = 0;
  }

  public readonly id: MatrixId;
  public readonly characterId: CharacterId;
  public readonly type: MatrixType;
  private readonly definition: MatrixDefinition;
  private _stars: number;

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
