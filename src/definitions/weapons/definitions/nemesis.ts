import type { Weapon } from '../../types/weapon/weapon';

export const nemesis = {
  id: 'Nemesis',
  displayName: 'Nemesis',
  elementalIcon: 'Volt',
  resonanceElements: ['Volt'],
  calculationElements: ['Volt'],
  damageElement: 'Volt',
  type: 'Support',
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
      id: 'Volt Benediction',
      displayName: 'Volt Benediction',
      description:
        "+5% entire team's volt ATK by 5% when Benediction Resonance is active",
      value: 0.05,
      elementalTypes: ['Volt'],
      canStack: true,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      weaponResonanceRequirements: ['Benediction'],
    },
    {
      id: 'Nemesis 5*',
      displayName: 'Nemesis 5*',
      description: '+10% ATK for having 1 electrode out',
      value: 0.1,
      elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 5,
      maxStarRequirement: 5,
    },
    {
      id: 'Nemesis 6*',
      displayName: 'Nemesis 6*',
      description: '+15% ATK for having 2 electrode out',
      value: 0.15,
      elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 6,
      maxStarRequirement: 6,
    },
  ],
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  resources: [],
} satisfies Weapon;
