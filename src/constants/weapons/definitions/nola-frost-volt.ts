import type { WeaponDefinition } from '../../../models/weapon-definition';
import { nolaBase } from './nola-base';

export const nolaFrostVolt = {
  ...nolaBase,
  id: 'Nola (Frost-Volt)',
  displayName: 'Nola (Frost-Volt)',
  elementalIcon: 'Frost-Volt',
  resonanceElements: ['Frost', 'Volt'],
  calculationElements: ['Frost', 'Volt'],
  damageElement: 'Frost',
  attackPercentBuffs: [...nolaBase.attackPercentBuffs],
  critRateBuffs: [...nolaBase.critRateBuffs],
  critDamageBuffs: [...nolaBase.critDamageBuffs],
  normalAttacks: [...nolaBase.normalAttacks],
  dodgeAttacks: [...nolaBase.dodgeAttacks],
  skills: [...nolaBase.skills],
  discharges: [...nolaBase.discharges],
  buffs: [...nolaBase.buffs],
  passiveAttacks: [...nolaBase.passiveAttacks],
  resources: [...nolaBase.resources],
} as const satisfies WeaponDefinition;
