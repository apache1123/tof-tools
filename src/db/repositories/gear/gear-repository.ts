import type { Gear } from "../../../models/gear/gear";
import type { Id } from "../../../models/identifiable";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { GearDto } from "./dtos/gear-dto";
import { dtoToGear, gearToDto } from "./dtos/gear-dto";

export class GearRepository extends ValtioRepository<Gear, GearDto> {
  protected override cleanUpRelatedEntitiesOnItemRemoval(
    removedItemId: Id,
  ): void {
    // Remove the deleted gear from gear sets (in gear set presets)
    this.db.init(["gearSetPresets"]);
    this.db.get("gearSetPresets").items.forEach((gearSetPreset) => {
      gearSetPreset.gearSet.getSlots().forEach((slot) => {
        if (slot.gear?.id === removedItemId) {
          slot.gear = undefined;
        }
      });
    });
  }

  protected override itemToDto(item: Gear): GearDto {
    return gearToDto(item);
  }

  protected override dtoToItem(dto: GearDto): Gear {
    return dtoToGear(dto);
  }
}
