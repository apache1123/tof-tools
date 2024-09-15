import type { Weapon } from '../../types/weapon/weapon';

export const huma = {
  id: 'Huma',
  displayName: 'Huma',
  elementalIcon: 'Flame',
  resonanceElements: ['Flame'],
  calculationElements: ['Flame'],
  damageElement: 'Flame',
  type: 'Defense',
  attackPercentBuffs: [],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  resources: [],
} satisfies Weapon;
