import type { DataById } from '../models/data';

export type WeaponResonance =
  | 'None'
  | 'Attack'
  | 'Balance'
  | 'Benediction'
  | 'Fortitude';

export const weaponResonanceDamageBuffsLookup: DataById<
  WeaponResonance,
  number
> = {
  None: 0,
  Attack: 0.1,
  Balance: 0.05,
  Benediction: 0,
  Fortitude: 0,
};
