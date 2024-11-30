import { nanoid } from "nanoid";

import { maxNumOfMatrixStars } from "../../definitions/matrices/matrix";
import type { MatrixDefinitionId } from "../../definitions/matrices/matrix-definitions";
import { getMatrixDefinition } from "../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../definitions/matrices/matrix-type";
import type { MatrixDefinition } from "../../definitions/types/matrix/matrix-definition";
import type { CharacterId } from "../character/character";
import type { Dto } from "../dto";
import type { Id } from "../identifiable";
import type { Persistable } from "../persistable";
import type { MatrixType, MatrixTypeId } from "./matrix-type";

export type MatrixId = Id;

export class Matrix implements Persistable<MatrixDto> {
  public constructor(
    type: MatrixType,
    definition: MatrixDefinition,
    characterId: CharacterId,
  ) {
    this._id = nanoid();
    this._type = type;
    this.definition = definition;
    this._characterId = characterId;
    this._stars = 0;
  }

  private _id: MatrixId;
  private _characterId: string;
  private _type: MatrixType;
  private definition: MatrixDefinition;
  private _stars: number;

  public get id() {
    return this._id;
  }

  public get characterId(): string {
    return this._characterId;
  }

  public get type(): MatrixType {
    return this._type;
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

  public copyFromDto(dto: MatrixDto): void {
    const { id, characterId, typeId, definitionId, stars } = dto;
    this._id = id;
    this._characterId = characterId;
    this._type = getMatrixType(typeId);
    this.definition = getMatrixDefinition(definitionId);
    this.stars = stars;
  }
  public toDto(): MatrixDto {
    const { id, characterId, type, definition, stars } = this;
    return {
      id,
      characterId,
      typeId: type.id,
      definitionId: definition.id,
      stars,
      version: 1,
    };
  }
}

export interface MatrixDto extends Dto {
  id: string;
  characterId: string;
  typeId: MatrixTypeId;
  definitionId: MatrixDefinitionId;
  stars: number;
  version: 1;
}
