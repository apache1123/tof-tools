import type { WeaponPreset } from "../../../../models/weapon/weapon-preset";
import { WeaponPresetSlot } from "../../../../models/weapon/weapon-preset-slot";
import { logException } from "../../../../utils/exception-utils";
import { DeserializationError } from "../../../error/deserialization-error";
import type { Repository } from "../../../repository/types/repository";

export interface WeaponPresetSlotDto {
  weaponPresetId: string | undefined;
}

export function weaponPresetSlotToDto(
  weaponPresetSlot: WeaponPresetSlot,
): WeaponPresetSlotDto {
  return {
    weaponPresetId: weaponPresetSlot.weaponPreset?.id,
  };
}

export function dtoToWeaponPresetSlot(
  dto: WeaponPresetSlotDto,
  weaponPresetRepository: Repository<WeaponPreset>,
): WeaponPresetSlot {
  const { weaponPresetId } = dto;
  const weaponPresetSlot = new WeaponPresetSlot();

  if (weaponPresetId) {
    const weaponPreset = weaponPresetRepository.find(weaponPresetId);

    if (!weaponPreset) {
      logException(
        new DeserializationError(
          `Weapon preset with id ${weaponPresetId} not found`,
          dto,
        ),
      );
    }

    weaponPresetSlot.weaponPreset = weaponPreset;
  }

  return weaponPresetSlot;
}
