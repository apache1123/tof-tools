import { getWeaponDefinition } from "../../../definitions/weapons/weapon-definitions";
import { Weapon } from "../../../models/weapon/weapon";
import type { Db } from "../../db";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { DbStorage } from "../../storage/db-storage";
import type { WeaponDtoV2 } from "./weapon-dto";

export class WeaponRepository extends ValtioRepository<Weapon, WeaponDtoV2> {
  public constructor(key: string, storage: DbStorage, db: Db) {
    super(key, storage, db);
  }

  protected override itemToDto(item: Weapon): WeaponDtoV2 {
    const { definitionId, characterId, stars } = item;
    return {
      definitionId,
      characterId,
      stars,
      version: 2,
    };
  }

  protected override dtoToItem(dto: WeaponDtoV2): Weapon {
    const { definitionId, characterId, stars } = dto;

    const character = this.db.get("characters").find(characterId);
    if (!character) {
      throw new Error(
        `Character with Id ${characterId} not found when creating weapon`,
      );
    }

    const weapon = new Weapon(getWeaponDefinition(definitionId), character);
    weapon.stars = stars;
    return weapon;
  }
}
