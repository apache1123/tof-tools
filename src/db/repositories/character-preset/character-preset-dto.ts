import { CharacterPreset } from "../../../models/character/character-preset";
import type { GearSetPreset } from "../../../models/gear/gear-set-preset";
import type { TeamPreset } from "../../../models/team/team-preset";
import { logException } from "../../../utils/exception-utils";
import { DeserializationError } from "../../error/deserialization-error";
import type { Dto } from "../../repository/dto";
import type { Repository } from "../../repository/types/repository";

export interface CharacterPresetDto extends Dto {
  id: string;
  characterId: string;
  teamPresetId: string | undefined;
  gearSetPresetId: string | undefined;
  name: string;
  version: 1;
}

export function characterPresetToDto(
  characterPreset: CharacterPreset,
): CharacterPresetDto {
  const { id, characterId, teamPreset, gearSetPreset, name } = characterPreset;
  return {
    id,
    characterId,
    teamPresetId: teamPreset?.id,
    gearSetPresetId: gearSetPreset?.id,
    name,
    version: 1,
  };
}

export function dtoToCharacterPreset(
  dto: CharacterPresetDto,
  teamPresetRepository: Repository<TeamPreset>,
  gearSetPresetRepository: Repository<GearSetPreset>,
): CharacterPreset {
  const { id, characterId, teamPresetId, gearSetPresetId, name } = dto;

  let teamPreset: TeamPreset | undefined;
  if (teamPresetId) {
    teamPreset = teamPresetRepository.find(teamPresetId);

    if (!teamPreset) {
      logException(
        new DeserializationError(
          `No teamPreset found with id ${id} found.`,
          dto,
        ),
      );
    }
  }

  let gearSetPreset: GearSetPreset | undefined;
  if (gearSetPresetId) {
    gearSetPreset = gearSetPresetRepository.find(gearSetPresetId);

    if (!gearSetPreset) {
      logException(
        new DeserializationError(
          `No gearSetPreset found with id ${id} found.`,
          dto,
        ),
      );
    }
  }

  const characterPreset = new CharacterPreset(characterId, id);
  characterPreset.teamPreset = teamPreset;
  characterPreset.gearSetPreset = gearSetPreset;
  characterPreset.name = name;

  return characterPreset;
}
