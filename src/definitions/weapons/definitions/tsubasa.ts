import type { WeaponDefinition } from '../../../models/weapon-definition';

export const tsubasa = {
  id: 'Tsubasa',
  displayName: 'Tsubasa',
  elementalIcon: 'Frost',
  resonanceElements: ['Frost'],
  calculationElements: ['Frost'],
  damageElement: 'Frost',
  type: 'DPS',
  attackPercentBuffs: [],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  resources: [],
} satisfies WeaponDefinition;
