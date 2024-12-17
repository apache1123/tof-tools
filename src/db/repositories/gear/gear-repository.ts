import type { Gear } from "../../../models/gear/gear";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { GearDto } from "./dtos/gear-dto";
import { dtoToGear, gearToDto } from "./dtos/gear-dto";

export class GearRepository extends ValtioRepository<Gear, GearDto> {
  protected override itemToDto(item: Gear): GearDto {
    return gearToDto(item);
  }

  protected override dtoToItem(dto: GearDto): Gear {
    return dtoToGear(dto);
  }
}
