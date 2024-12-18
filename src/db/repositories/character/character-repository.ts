import { Character } from "../../../models/character/character";
import type { Id } from "../../../models/identifiable";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { CharacterDto } from "./character-dto";

export class CharacterRepository extends ValtioRepository<
  Character,
  CharacterDto
> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(
    removedItemId: Id,
  ): void {
    // Delete everything that belongs to the character
    this.db.init(["gears", "gearSetPresets", "matrices", "weapons"]);

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

    const weaponRepository = this.db.get("weapons");
    weaponRepository.items.forEach((weapon) => {
      if (weapon.characterId === removedItemId) {
        weaponRepository.remove(weapon.id);
      }
    });
  }

  protected override itemToDto(item: Character): CharacterDto {
    const { id, name, level } = item;
    return { id, name, level, version: 1 };
  }

  protected override dtoToItem(dto: CharacterDto): Character {
    const { id, name, level } = dto;
    const character = new Character(id);
    character.name = name;
    character.level = level;
    return character;
  }
}
