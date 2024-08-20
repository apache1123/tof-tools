import type { WeaponDefinition } from '../../../models/weapon-definition';

export const cocoritter = {
  id: 'Cocoritter',
  displayName: 'Cocoritter',
  elementalIcon: 'Frost',
  resonanceElements: ['Frost'],
  calculationElements: ['Frost'],
  damageElement: 'Frost',
  type: 'Support',
  attackPercentBuffs: [
    {
      id: 'Frost Resonance',
      displayName: 'Frost Resonance',
      description: '+15% frost ATK when equipping 2 or more frost weapons',
      value: 0.15,
      elementalTypes: ['Frost'],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['Frost'],
    },
    {
      id: 'Frost Benediction',
      displayName: 'Frost Benediction',
      description:
        "+5% entire team's frost ATK by 5% when Benediction Resonance is active",
      value: 0.05,
      elementalTypes: ['Frost'],
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
  passiveAttacks: [],
  resources: [],
} satisfies WeaponDefinition;
