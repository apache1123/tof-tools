import type { WeaponDefinition } from "../../../models/weapon-definition";
import { chargeResourceId, dodgeResourceId, fullCharge } from "../../resources";

export const ruby = {
  id: 'Ruby',
  displayName: 'Ruby',
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
    {
      id: 'Ultimate Heat',
      displayName: 'Ultimate Heat',
      description: 'Ultimate Heat gives +10% flame ATK after fully stacked',
      value: 0.1,
      elementalTypes: ['Flame'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 6,
    },
  ],
  critRateBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [
    {
      id: 'ruby-dodge-go-dolly',
      displayName: 'Ruby dodge - Go, Dolly!',
      elementalType: { defaultElementalType: 'Flame' },
      type: 'dodge',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 0,
        attackFlat: 0,
      },
      hitCount: {
        numberOfHitsFixed: 1,
      },
      endedBy: { duration: 30000 },
      cooldown: 0,
      triggeredBy: {
        playerInput: true,
      },
      requirements: {
        hasResource: {
          resourceId: 'dodge',
          minAmount: 1,
        },
      },
      updatesResources: [
        {
          resourceId: chargeResourceId,
          amount: 0,
        },
        {
          resourceId: dodgeResourceId,
          amount: -1,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  skills: [],
  discharge: {
    id: 'ruby-discharge',
    displayName: 'Ruby discharge [placeholder]',
    elementalType: { defaultElementalType: 'Flame' },
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
      notActiveWeapon: 'Ruby',
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