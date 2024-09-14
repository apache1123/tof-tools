export type DamageCategory =
  | 'Common - Final damage'
  | 'Common - Elemental damage'
  | 'Common - Final damage taken'
  | 'Common - Elemental damage taken'
  | 'Common - Ignore elemental resistance'
  | 'Weapon - Final damage'
  | 'Weapon - Elemental damage'
  | 'Matrix - Final damage'
  | 'Matrix - Elemental damage'
  | 'Relic - Final damage'
  | 'Relic - Elemental damage'
  | 'Simulacra - Final damage'
  | 'Simulacra - Elemental damage'
  | 'Resonance - Final damage'
  | 'Titan - Damage'
  | 'Titan - Normal attack damage'
  | 'Titan - Dodge attack damage'
  | 'Titan - Skill damage'
  | 'Titan - Discharge damage'
  | 'Titan - Weak point damage'
  | 'Flat multiplier'; // Some buffs are just straight-up flat multipliers. They are usually specific to an attack, or type of attack, e.g. Brevey 5* - Increase damage dealt by Metz off-hand coordinated attack and Metz Energy Wave by 30%. Hopefully they should occur independently and treating them as belonging to a damage category like this won't be a problem

export const titanRareStatDamageCategories: DamageCategory[] = [
  'Titan - Damage',
  'Titan - Normal attack damage',
  'Titan - Dodge attack damage',
  'Titan - Skill damage',
  'Titan - Discharge damage',
  'Titan - Weak point damage',
];
