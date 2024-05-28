import type { WeaponDefinition } from '../../../models/weapon-definition';
import { chargeResourceId, fullCharge } from '../../resources';

export const yanuo = {
  id: 'Yanuo',
  displayName: 'Yanuo',
  resonanceElements: ['Frost', 'Volt'],
  calculationElements: ['Frost', 'Volt'],
  damageElement: 'Frost',
  type: 'DPS',
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
      id: 'Yanuo - [Placeholder auto attack]',
      displayName: 'Yanuo - [Placeholder auto attack]',
      elementalType: { defaultElementalType: 'Frost' },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 9.58,
        attackFlat: 51,
      },
      hitCount: {
        numberOfHitsFixed: 6,
      },
      endedBy: { duration: 3650 },
      cooldown: 0,
      triggeredBy: {
        playerInput: true,
        requirements: {},
      },
      updatesResources: [
        {
          resourceId: chargeResourceId,
          // TODO: this is a placeholder value
          amount: 250,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  dodgeAttacks: [],
  skills: [
    {
      id: 'Yanuo - [Placeholder skill attack]',
      displayName: 'Yanuo - [Placeholder skill attack]',
      elementalType: { defaultElementalType: 'Frost' },
      type: 'skill',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 0,
        attackFlat: 0,
      },
      hitCount: {
        numberOfHitsFixed: 1,
      },
      endedBy: { duration: 5000 },
      cooldown: 30000,
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
  discharge: {
    id: 'yanuo-discharge',
    displayName: 'Yanuo discharge [placeholder]',
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
    cooldown: 30000,
    triggeredBy: {
      playerInput: true,
      requirements: {
        hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
        notActiveWeapon: 'Yanuo',
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
