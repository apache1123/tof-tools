import type { GearSetPreset } from "../../../models/gear/gear-set-preset";
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
  protected override cleanUpRelatedEntitiesOnItemRemoval(): void {
    return;
  }

  protected override itemToDto(item: GearSetPreset): GearSetPresetDto {
    return gearSetPresetToDto(item);
  }

  protected override dtoToItem(dto: GearSetPresetDto): GearSetPreset {
    return dtoToGearSetPreset(dto, this.db.get("gearSets"));
  }
}
