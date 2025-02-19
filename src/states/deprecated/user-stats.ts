import type { Dto } from "../../db/repository/dto";

/** @deprecated Migrated to `Character` */
export interface UserStatsStateDtoV2 extends Dto {
  characterLevel: number;
  version: 2;
}
