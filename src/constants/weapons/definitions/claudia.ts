import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId, fullCharge } from '../../resources';

export const claudia = {
  id: 'Claudia',
  displayName: 'Claudia',
  resonanceElements: ['Physical'],
  calculationElements: ['Physical'],
  damageElement: 'Physical',
  type: 'DPS',
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
  ],
  critRateBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'claudia-discharge',
    displayName: 'Claudia discharge [placeholder]',
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
    requirements: {
      hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
      notActiveWeapon: 'Claudia',
    },
    triggeredBy: {
      playerInput: true,
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
