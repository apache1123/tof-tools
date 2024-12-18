import type { GearTypeId } from "../../../../definitions/gear-types";
import { getGearType } from "../../../../definitions/gear-types";
import type { Gear, GearId } from "../../../../models/gear/gear";
import { GearSlot } from "../../../../models/gear/gear-slot";
import { logException } from "../../../../utils/exception-utils";
import { DeserializationError } from "../../../error/deserialization-error";
import type { Dto } from "../../../repository/dto";
import type { Repository } from "../../../repository/types/repository";

export interface GearSlotDto extends Dto {
  acceptsType: GearTypeId;
  gearId: GearId | undefined;
  version: 1;
}

export function gearSlotToDto(gearSlot: GearSlot): GearSlotDto {
  return {
    acceptsType: gearSlot.acceptsType.id,
    gearId: gearSlot.gear?.id ?? undefined,
    version: 1,
  };
}

export function dtoToGearSlot(
  dto: GearSlotDto,
  gearRepository: Repository<Gear>,
): GearSlot {
  const { acceptsType, gearId } = dto;

  const gearSlot = new GearSlot(getGearType(acceptsType));

  if (gearId) {
    const gear = gearRepository.find(gearId);

    if (!gear) {
      logException(
        new DeserializationError(`Gear with id ${gearId} not found`, dto),
      );
      return gearSlot;
    }

    gearSlot.gear = gear;
  }

  return gearSlot;
}
