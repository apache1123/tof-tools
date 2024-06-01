import type { WeaponDefinition } from '../../../models/weapon-definition';

export const king = {
  id: 'King',
  displayName: 'King',
  resonanceElements: ['Flame'],
  calculationElements: ['Flame'],
  damageElement: 'Flame',
  type: 'DPS',
  attackPercentBuffs: [],
  critRateBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  passiveAttacks: [],
  resources: [],
} satisfies WeaponDefinition;
