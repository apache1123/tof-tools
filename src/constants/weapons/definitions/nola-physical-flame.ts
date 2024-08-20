import type { WeaponDefinition } from '../../../models/weapon-definition';
import { nolaBase } from './nola-base';

export const nolaPhysicalFlame = {
  ...nolaBase,
  id: 'Nola (Physical-Flame)',
  displayName: 'Nola (Physical-Flame)',
  resonanceElements: ['Physical', 'Flame'],
  calculationElements: ['Physical', 'Flame'],
  damageElement: 'Physical',
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
