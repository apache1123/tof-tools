import type { StatName } from "../../../definitions/stat-types";
import type { Dto } from "../../repository/dto";

export interface RandomStatDto extends Dto {
  typeId: StatName;
  value: number;
  augmentIncreaseValue?: number;
  version: 1;
}
