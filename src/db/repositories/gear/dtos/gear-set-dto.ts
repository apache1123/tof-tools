import type { GearTypeId } from "../../../../definitions/gear-types";
import type { Gear } from "../../../../models/gear/gear";
import { GearSet } from "../../../../models/gear/gear-set";
import { logException } from "../../../../utils/exception-utils";
import { ForeignKeyDeserializationError } from "../../../error/foreign-key-deserialization-error";
import type { Repository } from "../../../repository/types/repository";
import type { GearSlotDto } from "./gear-slot-dto";
import { gearSlotToDto } from "./gear-slot-dto";

export interface GearSetDto {
  id: string;
  slots: Record<GearTypeId, GearSlotDto>;
}

export function gearSetToDto(gearSet: GearSet): GearSetDto {
  const { id } = gearSet;
  return {
    id,
    slots: {
      Helmet: mapSlotToDto("Helmet"),
      Eyepiece: mapSlotToDto("Eyepiece"),
      Spaulders: mapSlotToDto("Spaulders"),
      Gloves: mapSlotToDto("Gloves"),
      Bracers: mapSlotToDto("Bracers"),
      Armor: mapSlotToDto("Armor"),
      "Combat Engine": mapSlotToDto("Combat Engine"),
      Belt: mapSlotToDto("Belt"),
      Legguards: mapSlotToDto("Legguards"),
      Boots: mapSlotToDto("Boots"),
      Exoskeleton: mapSlotToDto("Exoskeleton"),
      Microreactor: mapSlotToDto("Microreactor"),
    },
  };

  function mapSlotToDto(typeId: GearTypeId): GearSlotDto {
    return gearSlotToDto(gearSet.getSlot(typeId));
  }
}

export function dtoToGearSet(
  dto: GearSetDto,
  gearRepository: Repository<Gear>,
): GearSet {
  const { id, slots } = dto;
  const gearSet = new GearSet(id);

  for (const slotDto of Object.values(slots)) {
    const { gearId } = slotDto;

    if (gearId) {
      const gear = gearRepository.find(gearId);

      if (!gear) {
        logException(
          new ForeignKeyDeserializationError(
            `Gear with id ${gearId} not found`,
            dto,
            gearRepository,
          ),
        );
        continue;
      }

      const slot = gearSet.getSlot(slotDto.acceptsType);
      if (slot) {
        slot.gear = gear;
      }
    }
  }

  return gearSet;
}
