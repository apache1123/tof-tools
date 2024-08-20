import type { WeaponDefinition } from '../../../models/weapon-definition';
import { nolaBase } from './nola-base';

export const nolaVoltFrost = {
  ...nolaBase,
  id: 'Nola (Volt-Frost)',
  displayName: 'Nola (Volt-Frost)',
  elementalIcon: 'Volt-Frost',
  resonanceElements: ['Volt', 'Frost'],
  calculationElements: ['Volt', 'Frost'],
  damageElement: 'Volt',
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
