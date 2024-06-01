import type { WeaponDefinition } from '../../../models/weapon-definition';

export const cobaltB = {
  id: 'Cobalt-B',
  displayName: 'Cobalt-B',
  resonanceElements: ['Flame'],
  calculationElements: ['Flame'],
  damageElement: 'Flame',
  type: 'DPS',
  attackPercentBuffs: [
    {
      id: 'Flame Resonance',
      displayName: 'Flame Resonance',
      description: '+15% flame ATK when equipping 2 or more flame weapons',
      value: 0.15,
      elementalTypes: ['Flame'],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['Flame'],
    },
  ],
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
