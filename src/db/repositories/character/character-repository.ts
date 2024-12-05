import { Character } from "../../../models/character/character";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { CharacterDto } from "./character-dto";

export class CharacterRepository extends ValtioRepository<
  Character,
  CharacterDto
> {
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
