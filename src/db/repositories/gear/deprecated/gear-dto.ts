import type { GearTypeId } from "../../../../definitions/gear-types";
import type { Dto } from "../../../repository/dto";
import type { AugmentStatDto } from "../dtos/augment-stat-dto";
import type { RandomStatDto } from "../dtos/random-stat-dto";

/** @deprecated Introduced Character. Gear must belong to a Character now */
export interface GearDtoV1 extends Dto {
  id: string;
  typeId: GearTypeId;
  stars: number;
  randomStats: (RandomStatDto | undefined)[];
  augmentStats?: AugmentStatDto[];
  isAugmented?: boolean;
  version: 1;
}
