import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId, fullCharge } from '../../resources';

export const crow = {
  id: 'Crow',
  displayName: 'Crow',
  resonanceElements: ['Volt'],
  calculationElements: ['Volt'],
  damageElement: 'Volt',
  type: 'DPS',
  attackPercentBuffs: [],
  critRateBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'crow-discharge',
    displayName: 'Crow discharge [placeholder]',
    elementalType: { defaultElementalType: 'Volt' },
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
        notActiveWeapon: 'Crow',
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
