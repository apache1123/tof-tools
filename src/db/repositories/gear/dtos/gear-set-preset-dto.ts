import type { GearSet, GearSetId } from "../../../../models/gear/gear-set";
import { GearSetPreset } from "../../../../models/gear/gear-set-preset";
import { DeserializationError } from "../../../error/deserialization-error";
import type { Dto } from "../../../repository/dto";
import type { Repository } from "../../../repository/types/repository";

export interface GearSetPresetDto extends Dto {
  id: string;
  characterId: string;
  name: string;
  gearSetId: GearSetId;
  version: 1;
}

export function gearSetPresetToDto(
  gearSetPreset: GearSetPreset,
): GearSetPresetDto {
  const { id, characterId, name, gearSet } = gearSetPreset;
  return {
    id,
    characterId,
    name,
    gearSetId: gearSet.id,
    version: 1,
  };
}

export function dtoToGearSetPreset(
  dto: GearSetPresetDto,
  gearSetRepository: Repository<GearSet>,
): GearSetPreset {
  const { id, characterId, name, gearSetId } = dto;

  const gearSet = gearSetRepository.find(gearSetId);
  if (!gearSet) {
    throw new DeserializationError(
      `GearSet with id ${gearSetId} not found`,
      dto,
    );
  }

  const preset = new GearSetPreset(characterId, id, gearSet);
  preset.name = name;
  return preset;
}
