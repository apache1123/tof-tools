import { getWeaponDefinition } from "../../../definitions/weapons/weapon-definitions";
import { Weapon } from "../../../models/weapon/weapon";
import type { Db } from "../../db";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { DbStorage } from "../../storage/db-storage";
import {
  dtoToMatrixSlots,
  matrixSlotsToDto,
} from "../matrix/dtos/matrix-slots-dto";
import type { WeaponDto } from "./weapon-dto";

export class WeaponRepository extends ValtioRepository<Weapon, WeaponDto> {
  public constructor(key: string, storage: DbStorage, db: Db) {
    super(key, storage, db);
  }

  protected override cleanUpRelatedEntitiesOnItemRemoval(): void {
    // TODO: This will need to remove the weapon from a team once the team repo is set up
    return;
  }

  protected override itemToDto(item: Weapon): WeaponDto {
    const { id, definitionId, characterId, stars, matrixSlots } = item;
    return {
      id,
      definitionId,
      characterId,
      stars,
      matrixSlots: matrixSlotsToDto(matrixSlots),
      version: 2,
    };
  }

  protected override dtoToItem(dto: WeaponDto): Weapon {
    const { id, definitionId, characterId, stars, matrixSlots } = dto;

    const weapon = new Weapon(
      getWeaponDefinition(definitionId),
      characterId,
      id,
      dtoToMatrixSlots(matrixSlots, this.db.get("matrices")),
    );
    weapon.stars = stars;

    return weapon;
  }
}
