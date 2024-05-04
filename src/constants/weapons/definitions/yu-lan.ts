import type { WeaponDefinition } from "../../../models/weapon-definition";
import { chargeResourceId, fullCharge } from "../../resources";

export const yuLan = {
  id: 'Yu Lan',
  displayName: 'Yu Lan',
  resonanceElements: ['Frost'],
  calculationElements: ['Frost'],
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
  ],
  critRateBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'yulan-discharge',
    displayName: 'Yu Lan discharge [placeholder]',
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
    requirements: {
      hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
      notActiveWeapon: 'Yu Lan',
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