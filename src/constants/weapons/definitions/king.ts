import type { WeaponDefinition } from '../../../models/weapon-definition';

export const king = {
  id: 'King',
  displayName: 'King',
  elementalIcon: 'Flame',
  resonanceElements: ['Flame'],
  calculationElements: ['Flame'],
  damageElement: 'Flame',
  type: 'DPS',
  attackPercentBuffs: [],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  passiveAttacks: [],
  resources: [],
} satisfies WeaponDefinition;
