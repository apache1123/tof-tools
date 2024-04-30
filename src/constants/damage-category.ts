export type DamageCategory =
  | 'Weapon resonance'
  | 'Relic passive'
  | 'Enemy debuff'
  | 'DMG buff category 1'
  | 'DMG buff category 2'
  | 'Weapon damage increase' // unsure. Specific weapon damage increase
  | '[TEMP_TRAIT]'
  | '[TEMP_UNKNOWN]';

export const titanRareStatDamageCategories: DamageCategory[] = [];
