import type { GearTypeId } from "../../../../definitions/gear-types";
import { getGearType } from "../../../../definitions/gear-types";
import { Gear } from "../../../../models/gear/gear";
import type { Dto } from "../../../repository/dto";
import type { AugmentStatDto } from "./augment-stat-dto";
import type { RandomStatDto } from "./random-stat-dto";
import { dtoToRandomStat, randomStatToDto } from "./random-stat-dto";

export interface GearDto extends Dto {
  id: string;
  typeId: GearTypeId;
  characterId: string;
  stars: number;
  randomStats: (RandomStatDto | undefined)[];
  augmentStats?: (AugmentStatDto | undefined)[];
  isAugmented?: boolean;
  version: 2;
}

export function gearToDto(item: Gear): GearDto {
  const {
    id,
    characterId,
    type,
    stars,
    randomStats,
    augmentStats,
    isAugmented,
  } = item;

  return {
    id,
    characterId,
    typeId: type.id,
    stars,
    randomStats: randomStats.map((randomStat) =>
      randomStat ? randomStatToDto(randomStat) : undefined,
    ),
    augmentStats: augmentStats.map((augmentStat) =>
      augmentStat ? randomStatToDto(augmentStat) : undefined,
    ),
    isAugmented,
    version: 2,
  };
}

export function dtoToGear(dto: GearDto) {
  const {
    id,
    typeId,
    characterId,
    stars,
    randomStats: randomStatDtos,
    augmentStats: augmentStatDtos,
    isAugmented,
  } = dto;

  const gear = new Gear(getGearType(typeId), characterId, id);
  gear.stars = stars;
  gear.isAugmented = !!isAugmented;

  randomStatDtos.forEach((randomStatDto, i) => {
    if (randomStatDto) {
      const randomStat = dtoToRandomStat(randomStatDto);
      gear.setRandomStat(i, randomStat);
    }
  });

  augmentStatDtos?.forEach((augmentStatDto, i) => {
    if (augmentStatDto) {
      const augmentStat = dtoToRandomStat(augmentStatDto);
      gear.setAugmentStat(i, augmentStat);
    }
  });

  return gear;
}
