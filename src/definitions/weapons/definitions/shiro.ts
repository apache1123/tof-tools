import type { WeaponDefinition } from '../../../models/weapon-definition';

export const shiro = {
  id: 'Shiro',
  displayName: 'Shiro',
  elementalIcon: 'Physical',
  resonanceElements: ['Physical'],
  calculationElements: ['Physical'],
  damageElement: 'Physical',
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
