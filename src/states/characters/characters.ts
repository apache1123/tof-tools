import type { Dto } from "../../models/dto";
import type { Persistable } from "../../models/persistable";
import type { CharacterDto } from "../../models/v4/character/character";
import { Character } from "../../models/v4/character/character";
import { SelectableRepository } from "../../models/v4/repository/selectable-repository";

export class CharactersState
  extends SelectableRepository<Character>
  implements Persistable<CharactersStateDto>
{
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

  public copyFromDto(dto: CharactersStateDto): void {
    const { items, selectedId } = dto;

    this.clear();
    this.addItems(
      items.map((item) => {
        const character = new Character();
        character.copyFromDto(item);
        return character;
      }),
    );

    this.selected = selectedId ? this.find(selectedId) : undefined;
  }

  public toDto(): CharactersStateDto {
    const { items, selected } = this;

    return {
      items: items.map((item) => item.toDto()),
      selectedId: selected?.id,
      version: 1,
    };
  }
}

export interface CharactersStateDto extends Dto {
  items: CharacterDto[];
  selectedId: string | undefined;
  version: 1;
}
