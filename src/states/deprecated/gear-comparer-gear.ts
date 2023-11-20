import type { Dto } from '../../models/dto';
import type { GearDto } from '../../models/gear';

/** @deprecated Migrated when switching to Loadouts */
export type GearComparerGearsStateDto = Record<
  'GearA' | 'GearB',
  GearDto | undefined
> &
  Dto;
