import type { WeaponDefinition } from "../../definitions/types/weapon/weapon-definition";
import { getWeaponDefinition } from "../../definitions/types/weapon/weapon-definition";
import { weaponDefinitions } from "../../definitions/weapons/weapon-definitions";
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

  public getCanAddWeaponDefinitions(): WeaponDefinition[] {
    return weaponDefinitions.allIds
      .filter((id) => {
        return !this.getCurrentCharacterWeapons().some(
          (weapon) => weapon.id === id,
        );
      })
      .map((id) => weaponDefinitions.byId[id]);
  }

  protected override createItemFromDto(itemDto: WeaponDtoV2): Weapon {
    const { definitionId, characterId } = itemDto;
    return new Weapon(getWeaponDefinition(definitionId), characterId);
  }
}
