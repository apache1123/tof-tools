import type { WeaponDefinition } from '../../../models/weapon-definition';
import { nolaBase } from './nola-base';

export const nolaAltered = {
  ...nolaBase,
  id: 'Nola (Altered)',
  displayName: 'Nola (Altered)',
  elementalIcon: 'Altered',
  resonanceElements: ['Altered'],
  calculationElements: ['Altered'],
  damageElement: 'Altered',
  attackPercentBuffs: [...nolaBase.attackPercentBuffs],
  critRateBuffs: [...nolaBase.critRateBuffs],
  critDamageBuffs: [...nolaBase.critDamageBuffs],
  normalAttacks: [...nolaBase.normalAttacks],
  dodgeAttacks: [...nolaBase.dodgeAttacks],
  skills: [...nolaBase.skills],
  discharges: [...nolaBase.discharges],
  buffs: [...nolaBase.buffs],
  resources: [...nolaBase.resources],
} as const satisfies WeaponDefinition;
