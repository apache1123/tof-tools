import type { WeaponDefinition } from '../../../models/weapon-definition';

export const annabella = {
  id: 'Annabella',
  displayName: 'Annabella',
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
  critRateBuffs: [
    {
      id: 'Tranquil Heart',
      displayName: 'Tranquil Heart',
      description:
        'Tranquil Heart: after using discharge/skill/dodge/charge attack, increase crit rate by 5%, stacking up to 3 times. Lasts for 15s.',
      value: 0.15,
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 2,
    },
    {
      id: 'Tranquil Heart',
      displayName: 'Tranquil Heart',
      description:
        'Tranquil Heart: after using discharge/skill/dodge/charge attack, increase crit rate by 9%, stacking up to 3 times. Lasts for 15s.',
      value: 0.27,
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 3,
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
