import { WeaponSlot } from "../../../../models/team/weapon-slot";
import type { Weapon } from "../../../../models/weapon/weapon";
import { logException } from "../../../../utils/exception-utils";
import { DeserializationError } from "../../../error/deserialization-error";
import type { Repository } from "../../../repository/types/repository";

export interface WeaponSlotDto {
  weaponId: string | undefined;
}

export function weaponSlotToDto(weaponSlot: WeaponSlot): WeaponSlotDto {
  return {
    weaponId: weaponSlot.weapon?.id,
  };
}

export function dtoToWeaponSlot(
  dto: WeaponSlotDto,
  weaponRepository: Repository<Weapon>,
): WeaponSlot {
  const { weaponId } = dto;
  const weaponSlot = new WeaponSlot();

  if (weaponId) {
    const weapon = weaponRepository.find(weaponId);

    if (!weapon) {
      logException(
        new DeserializationError(`Weapon with id ${weaponId} not found`, dto),
      );

      return weaponSlot;
    }

    weaponSlot.weapon = weapon;
  }

  return weaponSlot;
}
