import { getSimulacrumTrait } from "../../../definitions/simulacra/simulacrum-traits";
import { CharacterPreset } from "../../../models/character-preset/character-preset";
import type { GearSetPreset } from "../../../models/gear/gear-set-preset";
import type {
  SimulacrumTrait,
  SimulacrumTraitId,
} from "../../../models/simulacrum-trait";
import type { TeamPreset } from "../../../models/team/team-preset";
import { logException } from "../../../utils/exception-utils";
import { ForeignKeyDeserializationError } from "../../error/foreign-key-deserialization-error";
import type { Repository } from "../../repository/types/repository";
import type { BaseAttacksDto } from "./base-attacks-dto";
import { baseAttacksToDto, dtoToBaseAttacks } from "./base-attacks-dto";
import type { BuffAbilityDefinitionDto } from "./buff-ability-definition-dto";

export interface CharacterPresetDto {
  id: string;
  characterId: string;
  teamPresetId: string | undefined;
  gearSetPresetId: string | undefined;
  name: string;
  simulacrumTraitId: SimulacrumTraitId | undefined;
  baseAttacks: BaseAttacksDto;
  critRateFlat: number;
  customBuffAbilities?: BuffAbilityDefinitionDto[];
}

export function characterPresetToDto(
  characterPreset: CharacterPreset,
): CharacterPresetDto {
  const {
    id,
    characterId,
    teamPreset,
    gearSetPreset,
    name,
    simulacrumTrait,
    baseAttacks,
    critRateFlat,
    customBuffAbilities,
  } = characterPreset;
  return {
    id,
    characterId,
    teamPresetId: teamPreset?.id,
    gearSetPresetId: gearSetPreset?.id,
    name,
    simulacrumTraitId: simulacrumTrait?.id,
    baseAttacks: baseAttacksToDto(baseAttacks),
    critRateFlat,
    customBuffAbilities,
  };
}

export function dtoToCharacterPreset(
  dto: CharacterPresetDto,
  teamPresetRepository: Repository<TeamPreset>,
  gearSetPresetRepository: Repository<GearSetPreset>,
): CharacterPreset {
  const {
    id,
    characterId,
    teamPresetId,
    gearSetPresetId,
    name,
    simulacrumTraitId,
    baseAttacks,
    critRateFlat,
    customBuffAbilities,
  } = dto;

  let teamPreset: TeamPreset | undefined;
  if (teamPresetId) {
    teamPreset = teamPresetRepository.find(teamPresetId);

    if (!teamPreset) {
      logException(
        new ForeignKeyDeserializationError(
          `No teamPreset found`,
          dto,
          teamPresetRepository,
        ),
      );
    }
  }

  let gearSetPreset: GearSetPreset | undefined;
  if (gearSetPresetId) {
    gearSetPreset = gearSetPresetRepository.find(gearSetPresetId);

    if (!gearSetPreset) {
      logException(
        new ForeignKeyDeserializationError(
          `No gearSetPreset found`,
          dto,
          gearSetPresetRepository,
        ),
      );
    }
  }

  let simulacrumTrait: SimulacrumTrait | undefined;
  if (simulacrumTraitId) {
    try {
      simulacrumTrait = getSimulacrumTrait(simulacrumTraitId);
    } catch (e) {
      logException(e);
    }
  }

  const characterPreset = new CharacterPreset(characterId, id);
  characterPreset.teamPreset = teamPreset;
  characterPreset.gearSetPreset = gearSetPreset;
  characterPreset.name = name;
  characterPreset.simulacrumTrait = simulacrumTrait;
  characterPreset.baseAttacks = dtoToBaseAttacks(baseAttacks);
  characterPreset.critRateFlat = critRateFlat;
  if (customBuffAbilities) {
    characterPreset.customBuffAbilities = customBuffAbilities;
  }

  return characterPreset;
}
