import type { CharacterDto } from "../../models/v4/character/character";
import { Character } from "../../models/v4/character/character";
import { SelectablePersistableRepository } from "../repository/selectable-persistable-repository";

export class CharactersState extends SelectablePersistableRepository<
  Character,
  CharacterDto
> {
  public addDefaultCharacter() {
    const character = new Character();
    character.name = "Default wanderer";
    this.add(character);
  }

  public selectFirstCharacter() {
    const firstCharacter = this.items[0];
    if (firstCharacter) {
      this.selected = firstCharacter;
    }
  }

  protected override createItemFromDto(): Character {
    return new Character();
  }
}
