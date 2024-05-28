import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId, fullCharge } from '../../resources';

export const tsubasa = {
  id: 'Tsubasa',
  displayName: 'Tsubasa',
  resonanceElements: ['Frost'],
  calculationElements: ['Frost'],
  damageElement: 'Frost',
  type: 'DPS',
  attackPercentBuffs: [],
  critRateBuffs: [],
  normalAttacks: [
    {
      id: 'tsubasa-auto-chain',
      displayName: 'Tsubasa - auto chain [placeholder]',
      elementalType: { defaultElementalType: 'Frost' },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 0,
        attackFlat: 0,
      },
      hitCount: {
        numberOfHitsFixed: 6,
      },
      endedBy: { duration: 5000 },
      cooldown: 0,
      triggeredBy: { playerInput: true, requirements: {} },
      updatesResources: [
        {
          resourceId: chargeResourceId,
          amount: 0,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'tsubasa-discharge',
    displayName: 'Tsubasa discharge [placeholder]',
    elementalType: { defaultElementalType: 'Frost' },
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
        notActiveWeapon: 'Tsubasa',
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
