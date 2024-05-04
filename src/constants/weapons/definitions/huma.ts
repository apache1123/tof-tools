import type { WeaponDefinition } from "../../../models/weapon-definition";
import { chargeResourceId, fullCharge } from "../../resources";

export const huma = {
  id: 'Huma',
  displayName: 'Huma',
  resonanceElements: ['Flame'],
  calculationElements: ['Flame'],
  damageElement: 'Flame',
  type: 'Defense',
  attackPercentBuffs: [],
  critRateBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'huma-discharge',
    displayName: 'Huma discharge [placeholder]',
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
      notActiveWeapon: 'Huma',
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