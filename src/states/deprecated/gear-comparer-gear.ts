import type { Dto } from "../../models/dto";
import type { GearDtoV1 } from "../../models/gear/gear";

/** @deprecated Migrated when switching to Loadouts */
export type GearComparerGearsStateDto = Record<
  "GearA" | "GearB",
  GearDtoV1 | undefined
> &
  Dto;
