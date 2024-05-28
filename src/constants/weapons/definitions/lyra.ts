import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId, fullCharge } from '../../resources';

export const lyra = {
  id: 'Lyra',
  displayName: 'Lyra',
  resonanceElements: ['Physical'],
  calculationElements: ['Physical'],
  damageElement: 'Physical',
  type: 'Support',
  attackPercentBuffs: [
    {
      id: 'Physical Resonance',
      displayName: 'Physical Resonance',
      description:
        '+15% physical ATK when equipping 2 or more physical weapons',
      value: 0.15,
      elementalTypes: ['Physical'],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['Physical'],
    },
    {
      id: 'Physical Benediction',
      displayName: 'Physical Benediction',
      description:
        "+5% entire team's physical ATK by 5% when Benediction Resonance is active",
      value: 0.05,
      elementalTypes: ['Physical'],
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
    id: 'lyra-discharge',
    displayName: 'Lyra discharge [placeholder]',
    elementalType: { defaultElementalType: 'Physical' },
    type: 'discharge',
    damageModifiers: {
      damageDealtIsPerSecond: false,
      attackMultiplier: 0,
      attackFlat: 0,
    },
    hitCount: {
      numberOfHitsFixed: 1,
    },
    endedBy: { duration: 5000 },
    cooldown: 0,
    triggeredBy: {
      playerInput: true,
      requirements: {
        hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
        notActiveWeapon: 'Lyra',
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
  passiveAttacks: [],
  resources: [],
} satisfies WeaponDefinition;
