import type { Gear } from "../../../../models/gear/gear";
import { GearSetPreset } from "../../../../models/gear/gear-set-preset";
import type { Dto } from "../../../repository/dto";
import type { Repository } from "../../../repository/types/repository";
import type { GearSetDto } from "./gear-set-dto";
import { dtoToGearSet, gearSetToDto } from "./gear-set-dto";

export interface GearSetPresetDto extends Dto {
  id: string;
  characterId: string;
  name: string;
  gearSet: GearSetDto;
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
    gearSet: gearSetToDto(gearSet),
    version: 1,
  };
}

export function dtoToGearSetPreset(
  dto: GearSetPresetDto,
  gearRepository: Repository<Gear>,
): GearSetPreset {
  const { id, characterId, name } = dto;

  const gearSet = dtoToGearSet(dto.gearSet, gearRepository);
  const preset = new GearSetPreset(characterId, id, gearSet);
  preset.name = name;
  return preset;
}
