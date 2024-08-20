import type { WeaponDefinition } from '../../../models/weapon-definition';
import { nolaBase } from './nola-base';

export const nolaFlamePhysical = {
  ...nolaBase,
  id: 'Nola (Flame-Physical)',
  displayName: 'Nola (Flame-Physical)',
  elementalIcon: 'Flame-Physical',
  resonanceElements: ['Flame', 'Physical'],
  calculationElements: ['Flame', 'Physical'],
  damageElement: 'Flame',
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
