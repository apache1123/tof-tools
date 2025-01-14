import type { WeaponElementalType } from "../../../definitions/elemental-type";
import { BaseAttacks } from "../../../models/base-attacks";
import type { DataById } from "../../../models/data";
import type { Dto } from "../../repository/dto";

export interface BaseAttacksDto extends Dto {
  values: DataById<WeaponElementalType, number>;
  version: 1;
}

export function baseAttacksToDto(baseAttacks: BaseAttacks): BaseAttacksDto {
  return {
    values: baseAttacks.getAll(),
    version: 1,
  };
}

export function dtoToBaseAttacks(dto: BaseAttacksDto): BaseAttacks {
  return new BaseAttacks(dto.values);
}
