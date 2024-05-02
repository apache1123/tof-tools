import type { WeaponDefinition } from "../../../models/weapon-definition";
import { chargeResourceId, fullCharge } from "../../resources";

export const mimi = {
  id: 'Huang (Mimi)',
  displayName: 'Huang (Mimi)',
  resonanceElements: ['Volt'],
  calculationElements: ['Volt'],
  damageElement: 'Volt',
  type: 'Defense',
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
  ],
  critRateBuffs: [],
  normalAttacks: [
    {
      id: 'mimi-normal-auto-chain',
      displayName: 'Mimi - Auto chain',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 11.257,
        attackFlat: 59,
      },
      hitCount: {
        numberOfHitsFixed: 5,
      },
      endedBy: { duration: 3370 },
      cooldown: 0,
      triggeredBy: {
        playerInput: true,
      },
      requirements: {},
      updatesResources: [
        {
          resourceId: chargeResourceId,
          // TODO:
          amount: 0,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'mimi-discharge',
    displayName: 'Mimi - Discharge [placeholder]',
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
    requirements: {
      hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
      notActiveWeapon: 'Huang (Mimi)',
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