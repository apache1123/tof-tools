import { CharacterData } from "../../../models/character/character-data";
import type { Id } from "../../../models/identifiable";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { CharacterDataDto } from "./character-data-dto";

export class CharacterDataRepository extends ValtioRepository<
  CharacterData,
  CharacterDataDto
> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(
    removedItemId: Id,
  ): void {
    // Delete everything that belongs to the character
    this.db.init(["gears", "gearSetPresets", "matrices", "weaponPresets"]);

    const gearRepository = this.db.get("gears");
    gearRepository.items.forEach((gear) => {
      if (gear.characterId === removedItemId) {
        gearRepository.remove(gear.id);
      }
    });

    const gearSetPresetRepo = this.db.get("gearSetPresets");
    gearSetPresetRepo.items.forEach((preset) => {
      if (preset.characterId === removedItemId) {
        gearSetPresetRepo.remove(preset.id);
      }
    });

    const matrixRepository = this.db.get("matrices");
    matrixRepository.items.forEach((matrix) => {
      if (matrix.characterId === removedItemId) {
        matrixRepository.remove(matrix.id);
      }
    });

    const weaponPresetRepository = this.db.get("weaponPresets");
    weaponPresetRepository.items.forEach((weaponPreset) => {
      if (weaponPreset.characterId === removedItemId) {
        weaponPresetRepository.remove(weaponPreset.id);
      }
    });

    const teamPresetRepository = this.db.get("teamPresets");
    teamPresetRepository.items.forEach((preset) => {
      if (preset.characterId === removedItemId) {
        teamPresetRepository.remove(preset.id);
      }
    });
  }

  protected override itemToDto(item: CharacterData): CharacterDataDto {
    const { id, name, level } = item;
    return { id, name, level, version: 1 };
  }

  protected override dtoToItem(dto: CharacterDataDto): CharacterData {
    const { id, name, level } = dto;
    const characterInfo = new CharacterData(id);
    characterInfo.name = name;
    characterInfo.level = level;
    return characterInfo;
  }
}
