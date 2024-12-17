import type { GearDtoV1 } from "../../db/repositories/gear/deprecated/gear-dto";
import type { Dto } from "../../db/repository/dto";

/** @deprecated Migrated when switching to Loadouts */
export type GearComparerGearsStateDto = Record<
  "GearA" | "GearB",
  GearDtoV1 | undefined
> &
  Dto;
