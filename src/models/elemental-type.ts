export enum ElementalType {
  None = 'None',
  All = 'All',
  Altered = 'Altered',
  Flame = 'Flame',
  Frost = 'Frost',
  Physical = 'Physical',
  Volt = 'Volt',
}

export type CoreElementalType =
  | ElementalType.Flame
  | ElementalType.Frost
  | ElementalType.Physical
  | ElementalType.Volt;

export type WeaponElementalType = CoreElementalType | ElementalType.Altered;