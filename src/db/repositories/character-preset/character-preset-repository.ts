import type { CharacterPreset } from "../../../models/character-preset/character-preset";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { CharacterPresetDto } from "./character-preset-dto";
import {
  characterPresetToDto,
  dtoToCharacterPreset,
} from "./character-preset-dto";

export class CharacterPresetRepository extends ValtioRepository<
  CharacterPreset,
  CharacterPresetDto
> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(): void {
    return;
  }

  protected override itemToDto(item: CharacterPreset): CharacterPresetDto {
    return characterPresetToDto(item);
  }

  protected override dtoToItem(dto: CharacterPresetDto): CharacterPreset {
    return dtoToCharacterPreset(
      dto,
      this.db.get("teamPresets"),
      this.db.get("gearSetPresets"),
    );
  }
}
