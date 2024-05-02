import type { WeaponDefinition } from "../../../models/weapon-definition";
import { chargeResourceId, fullCharge } from "../../resources";

export const tianLang = {
  id: 'Tian Lang',
  displayName: 'Tian Lang',
  resonanceElements: ['Volt'],
  calculationElements: ['Volt'],
  damageElement: 'Volt',
  type: 'DPS',
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
    {
      id: 'Volt sense',
      displayName: 'Volt sense',
      description:
        '+6% volt ATK for each other volt weapons equipped. (The tool only assumes 1 other volt weapon)',
      value: 0.06,
      elementalTypes: ['Volt'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ['Volt'],
    },
  ],
  critRateBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharge: {
    id: 'tianlang-discharge',
    displayName: 'Tian Lang discharge [placeholder]',
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
      notActiveWeapon: 'Tian Lang',
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