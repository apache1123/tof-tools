import type { AugmentStatDto } from "../../../db/repositories/gear/dtos/augment-stat-dto";
import type { RandomStatDto } from "../../../db/repositories/gear/dtos/random-stat-dto";
import type { Dto } from "../../../db/repository/dto";
import type { GearTypeId } from "../../../definitions/gear-types";

/** @deprecated Introduced Character. Gear must belong to a Character now */
export interface GearDtoV3 extends Dto {
  id: string;
  typeId: GearTypeId;
  stars: number;
  randomStats: (RandomStatDto | undefined)[];
  augmentStats?: AugmentStatDto[];
  isAugmented?: boolean;
  version: 1;
}
