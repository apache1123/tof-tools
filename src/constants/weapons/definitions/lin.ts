import type { WeaponDefinition } from "../../../models/weapon-definition";
import { chargeResourceId, fullCharge } from "../../resources";

export const lin = {
  id: 'Lin',
  displayName: 'Lin',
  resonanceElements: ['Altered'],
  calculationElements: ['Altered'],
  damageElement: 'Altered',
  type: 'DPS',
  attackPercentBuffs: [
    {
      id: 'Moonlight Realm',
      displayName: 'Moonlight Realm',
      description: 'Moonlight Realm gives +15% ATK for its duration',
      value: 0.15,
      elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 5,
    },
    {
      id: 'Moonlight Realm',
      displayName: 'Moonlight Realm',
      description: 'Moonlight Realm gives +23% ATK for its duration',
      value: 0.23,
      elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 6,
      maxStarRequirement: 6,
    },
    {
      id: 'Frost Moonlight Realm',
      displayName: 'Frost Moonlight Realm',
      description: 'Frost Moonlight Realm gives +10% frost ATK',
      value: 0.1,
      elementalTypes: ['Frost'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['Frost'],
    },
    {
      id: 'Balance Moonlight Realm',
      displayName: 'Balance Moonlight Realm',
      description:
        'When paired with any 2 different elemental weapons, Moonlight Realm gives +15% ATK',
      value: 0.15,
      elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['None'],
    },
  ],
  critRateBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'lin-discharge',
    displayName: 'Lin discharge [placeholder]',
    elementalType: { defaultElementalType: 'Altered' },
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
      notActiveWeapon: 'Lin',
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