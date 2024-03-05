export type CoreElementalType = 'Flame' | 'Frost' | 'Physical' | 'Volt';

export type WeaponElementalType = CoreElementalType | 'Altered';

export type ElementalType = WeaponElementalType | 'None' | 'All';

export type AttackDefinitionElementalType = WeaponElementalType | 'LastWeapon';
