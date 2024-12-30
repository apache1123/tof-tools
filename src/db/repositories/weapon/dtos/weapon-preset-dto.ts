import type { Matrix } from "../../../../models/matrix/matrix";
import type { Weapon } from "../../../../models/weapon/weapon";
import { WeaponPreset } from "../../../../models/weapon/weapon-preset";
import { DeserializationError } from "../../../error/deserialization-error";
import type { Dto } from "../../../repository/dto";
import type { Repository } from "../../../repository/types/repository";
import type { MatrixSlotsDto } from "../../matrix/dtos/matrix-slots-dto";
import {
  dtoToMatrixSlots,
  matrixSlotsToDto,
} from "../../matrix/dtos/matrix-slots-dto";

export interface WeaponPresetDto extends Dto {
  id: string;
  weaponId: string;
  matrixSlots: MatrixSlotsDto;
  version: 1;
}

export function weaponPresetToDto(weaponPreset: WeaponPreset): WeaponPresetDto {
  const { id, weapon, matrixSlots } = weaponPreset;
  return {
    id,
    weaponId: weapon.id,
    matrixSlots: matrixSlotsToDto(matrixSlots),
    version: 1,
  };
}

export function dtoToWeaponPreset(
  dto: WeaponPresetDto,
  weaponRepository: Repository<Weapon>,
  matrixRepository: Repository<Matrix>,
): WeaponPreset {
  const { id, weaponId, matrixSlots } = dto;

  const weapon = weaponRepository.find(weaponId);
  if (!weapon)
    throw new DeserializationError(`Weapon with id ${weaponId} not found`, dto);

  return new WeaponPreset(
    weapon,
    id,
    dtoToMatrixSlots(matrixSlots, matrixRepository),
  );
}
