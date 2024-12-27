import type { WeaponPreset } from "../../../models/weapon/weapon-preset";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { WeaponPresetDto } from "./dtos/weapon-preset-dto";
import { dtoToWeaponPreset, weaponPresetToDto } from "./dtos/weapon-preset-dto";

export class WeaponPresetRepository extends ValtioRepository<
  WeaponPreset,
  WeaponPresetDto
> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(): void {
    return;
  }

  protected override itemToDto(item: WeaponPreset): WeaponPresetDto {
    return weaponPresetToDto(item);
  }

  protected override dtoToItem(dto: WeaponPresetDto): WeaponPreset {
    return dtoToWeaponPreset(dto, this.db.get("matrices"));
  }
}
