import type { WeaponDefinition } from '../../../models/weapon-definition';

export const nolaBase = {
  id: 'Nola',
  displayName: 'Nola',
  iconWeaponName: 'Nola',
  resonanceElements: [],
  calculationElements: [],
  damageElement: 'Altered',
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
} as const satisfies WeaponDefinition;
