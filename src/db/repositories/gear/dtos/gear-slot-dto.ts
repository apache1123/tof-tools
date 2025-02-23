import type { GearTypeId } from "../../../../definitions/gear-types";
import { getGearType } from "../../../../definitions/gear-types";
import type { Gear, GearId } from "../../../../models/gear/gear";
import { GearSlot } from "../../../../models/gear/gear-slot";
import { logException } from "../../../../utils/exception-utils";
import { ForeignKeyDeserializationError } from "../../../error/foreign-key-deserialization-error";
import type { Repository } from "../../../repository/types/repository";

export interface GearSlotDto {
  acceptsType: GearTypeId;
  gearId: GearId | undefined;
}

export function gearSlotToDto(gearSlot: GearSlot): GearSlotDto {
  return {
    acceptsType: gearSlot.acceptsType.id,
    gearId: gearSlot.gear?.id ?? undefined,
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
        new ForeignKeyDeserializationError(
          `Gear not found`,
          dto,
          gearRepository,
        ),
      );
      return gearSlot;
    }

    gearSlot.gear = gear;
  }

  return gearSlot;
}
