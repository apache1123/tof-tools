import type { GearSet } from "../../../models/gear/gear-set";
import type { Id } from "../../../models/identifiable";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { GearSetDto } from "./dtos/gear-set-dto";
import { dtoToGearSet, gearSetToDto } from "./dtos/gear-set-dto";

export class GearSetRepository extends ValtioRepository<GearSet, GearSetDto> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(
    removedItemId: Id,
  ): void {
    // Gear set preset cannot exist without a gear set. Delete the preset if its gear set is this one
    this.db.init(["gearSetPresets"]);
    const gearSetPresetRepo = this.db.get("gearSetPresets");
    gearSetPresetRepo.items.forEach((preset) => {
      if (preset.gearSet.id === removedItemId) {
        gearSetPresetRepo.remove(preset.id);
      }
    });
  }

  protected override itemToDto(item: GearSet): GearSetDto {
    return gearSetToDto(item);
  }

  protected override dtoToItem(dto: GearSetDto): GearSet {
    return dtoToGearSet(dto, this.db.get("gears"));
  }
}
