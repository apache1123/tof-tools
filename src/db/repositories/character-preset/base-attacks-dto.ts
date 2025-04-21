import type { ElementalType } from "../../../definitions/elemental-type";
import { BaseAttacks } from "../../../models/base-attacks";
import type { DataById } from "../../../models/data";

export interface BaseAttacksDto {
  values: DataById<ElementalType, number>;
}

export function baseAttacksToDto(baseAttacks: BaseAttacks): BaseAttacksDto {
  return {
    values: baseAttacks.getAll(),
  };
}

export function dtoToBaseAttacks(dto: BaseAttacksDto): BaseAttacks {
  return new BaseAttacks(dto.values);
}
