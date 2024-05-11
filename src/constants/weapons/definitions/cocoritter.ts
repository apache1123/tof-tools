import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId, fullCharge } from '../../resources';

export const cocoritter = {
  id: 'Cocoritter',
  displayName: 'Cocoritter',
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
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'coco-discharge',
    displayName: 'Cocoritter discharge [placeholder]',
    elementalType: { defaultElementalType: 'Frost' },
    type: 'discharge',
    damageModifiers: {
      damageDealtIsPerSecond: false,
      attackMultiplier: 0,
      attackFlat: 0,
    },
    hitCount: {
      numberOfHitsFixed: 0,
    },
    endedBy: { duration: 5000 },
    cooldown: 0,
    triggeredBy: {
      playerInput: true,
      requirements: {
        hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
        notActiveWeapon: 'Cocoritter',
      },
    },
    updatesResources: [
      {
        resourceId: chargeResourceId,
        amount: -fullCharge,
      },
    ],
    starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
  },
  buffs: [],
  triggeredAttacks: [],
  resources: [],
} satisfies WeaponDefinition;
