import type { GearSetPreset } from "../../../models/gear/gear-set-preset";
import type { Id } from "../../../models/identifiable";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { GearSetPresetDto } from "./dtos/gear-set-preset-dto";
import {
  dtoToGearSetPreset,
  gearSetPresetToDto,
} from "./dtos/gear-set-preset-dto";

export class GearSetPresetRepository extends ValtioRepository<
  GearSetPreset,
  GearSetPresetDto
> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(
    removedItemId: Id,
  ): void {
    // Remove from character presets
    this.db.get("characterPresets").items.forEach((characterPreset) => {
      if (characterPreset.gearSetPreset?.id === removedItemId) {
        characterPreset.gearSetPreset = undefined;
      }
    });
  }

  protected override itemToDto(item: GearSetPreset): GearSetPresetDto {
    return gearSetPresetToDto(item);
  }

  protected override dtoToItem(dto: GearSetPresetDto): GearSetPreset {
    return dtoToGearSetPreset(dto, this.db.get("gears"));
  }
}
