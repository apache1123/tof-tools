import type { WeaponDefinition } from '../../../models/weapon-definition';

export const meryl = {
  id: 'Meryl',
  displayName: 'Meryl',
  elementalIcon: 'Frost',
  resonanceElements: ['Frost'],
  calculationElements: ['Frost'],
  damageElement: 'Frost',
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
} satisfies WeaponDefinition;
