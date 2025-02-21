import type { Dto } from "../../../db/repository/dto";
import type { GearDtoV3 } from "../../v3/deprecated/gear-dto";

/** @deprecated Migrated when switching to Loadouts */
export type GearComparerGearsStateDtoV1 = Record<
  "GearA" | "GearB",
  GearDtoV3 | undefined
> &
  Dto;
