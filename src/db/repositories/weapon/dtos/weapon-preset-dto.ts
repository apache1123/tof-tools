import type { WeaponDefinitionId } from "../../../../definitions/weapons/weapon-definitions";
import { getWeaponDefinition } from "../../../../definitions/weapons/weapon-definitions";
import type { CharacterId } from "../../../../models/character/character-data";
import type { Matrix } from "../../../../models/matrix/matrix";
import { WeaponPreset } from "../../../../models/weapon/weapon-preset";
import { DeserializationError } from "../../../error/deserialization-error";
import type { Dto } from "../../../repository/dto";
import type { Repository } from "../../../repository/types/repository";
import type { MatrixSlotsDto } from "../../matrix/dtos/matrix-slots-dto";
import {
  dtoToMatrixSlots,
  matrixSlotsToDto,
} from "../../matrix/dtos/matrix-slots-dto";

export interface WeaponPresetDto extends Dto {
  id: string;
  definitionId: WeaponDefinitionId;
  characterId: CharacterId;
  stars: number;
  matrixSlots: MatrixSlotsDto;
  version: 1;
}

export function weaponPresetToDto(weaponPreset: WeaponPreset): WeaponPresetDto {
  const { id, characterId, definition, stars, matrixSlots } = weaponPreset;
  return {
    id,
    characterId,
    definitionId: definition.id,
    stars,
    matrixSlots: matrixSlotsToDto(matrixSlots),
    version: 1,
  };
}

export function dtoToWeaponPreset(
  dto: WeaponPresetDto,
  matrixRepository: Repository<Matrix>,
): WeaponPreset {
  const { id, characterId, definitionId, stars, matrixSlots } = dto;

  const definition = getWeaponDefinition(definitionId);
  if (!definition)
    throw new DeserializationError(
      `Weapon definition with id ${definitionId} not found`,
      dto,
    );

  const preset = new WeaponPreset(
    characterId,
    definition,
    id,
    dtoToMatrixSlots(matrixSlots, matrixRepository),
  );
  preset.stars = stars;

  return preset;
}
