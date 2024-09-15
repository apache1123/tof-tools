import type { Weapon } from '../../types/weapon/weapon';

export const zero = {
  id: 'Zero',
  displayName: 'Zero',
  elementalIcon: 'Flame',
  resonanceElements: ['Flame'],
  calculationElements: ['Flame'],
  damageElement: 'Flame',
  type: 'Support',
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
    {
      id: 'Flame Benediction',
      displayName: 'Flame Benediction',
      description:
        "+5% entire team's flame ATK by 5% when Benediction Resonance is active",
      value: 0.05,
      elementalTypes: ['Flame'],
      canStack: true,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      weaponResonanceRequirements: ['Benediction'],
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
