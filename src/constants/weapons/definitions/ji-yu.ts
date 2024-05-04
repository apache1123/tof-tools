import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId, fullCharge } from '../../resources';

export const jiYu = {
  id: 'Ji Yu',
  displayName: 'Ji Yu',
  resonanceElements: ['Flame', 'Physical'],
  calculationElements: ['Flame', 'Physical'],
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
    id: 'jiyu-discharge',
    displayName: 'Ji Yu discharge [placeholder]',
    elementalType: { defaultElementalType: 'Flame' },
    type: 'discharge',
    damageModifiers: {
      damageDealtIsPerSecond: false,
      attackMultiplier: 0,
      attackFlat: 0,
    },
    hitCount: { numberOfHitsFixed: 1 },
    endedBy: { duration: 1000 },
    cooldown: 0,
    requirements: {
      hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
      notActiveWeapon: 'Ji Yu',
    },
    triggeredBy: { playerInput: true },
    updatesResources: [
      {
        resourceId: chargeResourceId,
        amount: -fullCharge,
      },
    ],
    starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
  },
  triggeredAttacks: [],
  buffs: [],
  resources: [],
} satisfies WeaponDefinition;
