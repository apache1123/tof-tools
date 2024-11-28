import { getWeaponDefinition } from "../../definitions/types/weapon/weapon-definition";
import type { WeaponDtoV2 } from "../../models/weapon/weapon";
import { Weapon } from "../../models/weapon/weapon";
import type { CharactersState } from "../characters/characters-state";
import { PersistableRepository } from "../repository/persistable-repository";

export class WeaponsState extends PersistableRepository<Weapon, WeaponDtoV2> {
  public constructor(private readonly charactersState: CharactersState) {
    super();
  }

  public getCurrentCharacterWeapons(): Weapon[] {
    return this.items.filter(
      (weapon) => weapon.characterId === this.charactersState.selected?.id,
    );
  }

  protected override createItemFromDto(itemDto: WeaponDtoV2): Weapon {
    const { definitionId, characterId } = itemDto;
    return new Weapon(getWeaponDefinition(definitionId), characterId);
  }
}
