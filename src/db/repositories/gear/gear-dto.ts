import type { GearTypeId } from "../../../definitions/gear-types";
import type { Dto } from "../../repository/dto";
import type { AugmentStatDto } from "./augment-stat-dto";
import type { RandomStatDto } from "./random-stat-dto";

export interface GearDtoV2 extends Dto {
  id: string;
  typeId: GearTypeId;
  characterId: string;
  stars: number;
  randomStats: (RandomStatDto | undefined)[];
  augmentStats?: (AugmentStatDto | undefined)[];
  isAugmented?: boolean;
  version: 2;
}
