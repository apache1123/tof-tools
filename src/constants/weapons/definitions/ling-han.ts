import type { WeaponDefinition } from "../../../models/weapon-definition";
import { chargeResourceId, fullCharge } from "../../resources";

export const lingHan = {
  id: 'Ling Han',
  displayName: 'Ling Han',
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
    {
      id: 'Ling Han 1*',
      displayName: 'Ling Han 1*',
      description: '+10% frost ATK after launching Frost Blades',
      value: 0.1,
      elementalTypes: ['Frost'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 1,
      maxStarRequirement: 6,
    },
  ],
  critRateBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'linghan-discharge',
    displayName: 'Ling Han discharge [placeholder]',
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
      notActiveWeapon: 'Ling Han',
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