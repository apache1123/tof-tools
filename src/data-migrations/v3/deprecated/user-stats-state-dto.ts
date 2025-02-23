import type { Dto } from "../../../db/repository/dto";

/** @deprecated Migrated to `Character` */
export interface UserStatsStateDtoV3 extends Dto {
  characterLevel: number;
  version: 2;
}
