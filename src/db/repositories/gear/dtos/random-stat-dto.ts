import type { StatTypeId } from "../../../../definitions/stat-types";
import { getStatType } from "../../../../definitions/stat-types";
import { RandomStat } from "../../../../models/gear/random-stat";

export interface RandomStatDto {
  typeId: StatTypeId;
  value: number;
  augmentIncreaseValue?: number;
}

export function randomStatToDto(stat: RandomStat): RandomStatDto {
  const { type, value, augmentIncreaseValue } = stat;
  return {
    typeId: type.id,
    value,
    augmentIncreaseValue,
  };
}

export function dtoToRandomStat(randomStatDto: RandomStatDto) {
  const { typeId, value, augmentIncreaseValue } = randomStatDto;

  const randomStat = new RandomStat(getStatType(typeId));
  randomStat.value = value;
  randomStat.augmentIncreaseValue = augmentIncreaseValue ?? 0;
  return randomStat;
}
