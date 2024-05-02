import type { WeaponDefinition } from "../../../models/weapon-definition";
import { chargeResourceId, fullCharge } from "../../resources";

export const lan = {
  id: 'Lan',
  displayName: 'Lan',
  resonanceElements: ['Flame'],
  calculationElements: ['Flame'],
  damageElement: 'Flame',
  type: 'Defense',
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
  ],
  critRateBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'lan-discharge',
    displayName: 'Lan - Discharge [placeholder]',
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
      notActiveWeapon: 'Lan',
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