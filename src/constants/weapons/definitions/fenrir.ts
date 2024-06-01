import type { WeaponDefinition } from '../../../models/weapon-definition';

export const fenrir = {
  id: 'Fenrir',
  displayName: 'Fenrir',
  resonanceElements: ['Volt'],
  calculationElements: ['Volt'],
  damageElement: 'Volt',
  type: 'DPS',
  attackPercentBuffs: [
    {
      id: 'Volt Resonance',
      displayName: 'Volt Resonance',
      description: '+15% volt ATK when equipping 2 or more volt weapons',
      value: 0.15,
      elementalTypes: ['Volt'],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['Volt'],
    },
    {
      id: 'Elemental Balancing',
      displayName: 'Elemental Balancing',
      description: '+15% all ATK by equipping 3 weapons of different elements',
      value: 0.15,
      elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['None'],
    },
  ],
  critRateBuffs: [
    {
      id: 'Fenrir 6*',
      displayName: 'Fenrir 6*',
      description: 'Active when Fenrir is on-field + 5s off-field',
      value: 0.18,
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 6,
      maxStarRequirement: 6,
    },
  ],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  passiveAttacks: [],
  resources: [],
} satisfies WeaponDefinition;
