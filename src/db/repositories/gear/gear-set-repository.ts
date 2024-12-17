import type { GearSet } from "../../../models/gear/gear-set";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { GearSetDto } from "./dtos/gear-set-dto";
import { dtoToGearSet, gearSetToDto } from "./dtos/gear-set-dto";

export class GearSetRepository extends ValtioRepository<GearSet, GearSetDto> {
  protected override itemToDto(item: GearSet): GearSetDto {
    return gearSetToDto(item);
  }

  protected override dtoToItem(dto: GearSetDto): GearSet {
    return dtoToGearSet(dto, this.db.get("gears"));
  }
}
