import type { StatTypeId } from "../../../../definitions/stat-types";
import { getStatType } from "../../../../definitions/stat-types";
import { RandomStat } from "../../../../models/gear/random-stat";
import type { Dto } from "../../../repository/dto";

export interface RandomStatDto extends Dto {
  typeId: StatTypeId;
  value: number;
  augmentIncreaseValue?: number;
  version: 1;
}

export function randomStatToDto(stat: RandomStat): RandomStatDto {
  const { type, value, augmentIncreaseValue } = stat;
  return {
    typeId: type.id,
    value,
    augmentIncreaseValue,
    version: 1,
  };
}

export function dtoToRandomStat(randomStatDto: RandomStatDto) {
  const { typeId, value, augmentIncreaseValue } = randomStatDto;

  const randomStat = new RandomStat(getStatType(typeId));
  randomStat.value = value;
  randomStat.augmentIncreaseValue = augmentIncreaseValue ?? 0;
  return randomStat;
}
