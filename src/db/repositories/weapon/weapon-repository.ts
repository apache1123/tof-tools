import { getWeaponDefinition } from "../../../definitions/weapons/weapon-definitions";
import type { Id } from "../../../models/identifiable";
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

  protected override cleanUpRelatedEntitiesOnItemRemoval(
    removedItemId: Id,
  ): void {
    // Remove matrix presets that reference the removed weapon
    const matrixPresetRepo = this.db.get("matrixPresets");
    matrixPresetRepo.items.forEach((preset) => {
      if (preset.weaponId === removedItemId) {
        matrixPresetRepo.remove(preset.id);
      }
    });
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
