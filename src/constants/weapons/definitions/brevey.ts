import type { WeaponDefinition } from '../../../models/weapon-definition';
import {
  chargeResourceId,
  dodgeResourceId,
  enduranceResourceId,
  fullCharge,
} from '../../resources';
import { minEventDuration } from '../../tick';

export const brevey = {
  id: 'Brevey',
  displayName: 'Brevey',
  elementalIcon: 'Volt-Frost',
  resonanceElements: ['Volt', 'Frost'],
  calculationElements: ['Volt', 'Frost'],
  damageElement: 'Volt',
  type: 'Support',
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
  critDamageBuffs: [],
  normalAttacks: [
    {
      id: 'brevey-normal-auto-chain',
      displayName: 'Brevey - Auto chain',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 9.58,
        attackFlat: 51,
      },
      hitCount: {
        numberOfHitsFixed: 5,
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
          amount: 500,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: 'brevey-normal-hold',
      displayName: 'Brevey - Auto hold',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: true,
        attackMultiplier: 2.58,
        attackFlat: 0,
      },
      hitCount: { numberOfHitsPerSecond: 6 },
      cooldown: 0,
      triggeredBy: { playerInput: true, requirements: {} },
      endedBy: {
        duration: 2620, // TODO: what to do about hold attacks with no duration?
      },
      updatesResources: [
        {
          resourceId: chargeResourceId,
          amountPerSecond: 100, // TODO: placeholder.
        },
        {
          resourceId: enduranceResourceId,
          amountPerSecond: -21,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  dodgeAttacks: [
    {
      id: 'brevey-dodge-placeholder',
      displayName: 'Brevey dodge [placeholder]',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'dodge',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 1,
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
          hasResource: {
            resourceId: 'dodge',
            minAmount: 1,
          },
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
  skills: [
    {
      id: 'brevey-skill-million-metz-shockwave',
      displayName: 'Brevey skill - Million-Metz Shockwave',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'skill',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 5.85,
        attackFlat: 31,
      },
      hitCount: {
        numberOfHitsFixed: 1,
      },
      endedBy: { duration: 2250 },
      cooldown: 30000,
      triggeredBy: { playerInput: true, requirements: {} },
      updatesResources: [
        {
          resourceId: chargeResourceId,
          amount: 100,
        },
        {
          resourceId: 'damage-accumulated-factor-of-total-attack',
          depleteResource: true,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  discharges: [
    {
      id: 'brevey-discharge',
      displayName: 'Brevey discharge',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'discharge',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 8.11,
        attackFlat: 4866,
      },
      hitCount: { numberOfHitsFixed: 1 },
      endedBy: { duration: 3070 },
      cooldown: 0,
      triggeredBy: {
        playerInput: true,
        requirements: {
          hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
          notActiveWeapon: 'Brevey',
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
  ],
  buffs: [
    {
      id: 'brevey-buff-pact-amplification',
      displayName: 'Brevey - Pact Amplification',
      maxStacks: 1,
      triggeredBy: {
        endOfAttacks: ['brevey-skill-million-metz-shockwave'],
        requirements: {},
      },
      endedBy: {
        duration: 30000,
      },
      cooldown: 30000,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: 'brevey-damage-buff-pact-amplification-volt',
      displayName: 'Brevey - Pact Amplification Volt Buff',
      description:
        "During Pact Amplification, when Pactcrest ☆ Metz is in the main slot, increase the Wanderer's volt damage by 25%.",
      damageBuffs: [
        {
          value: 0.25,
          elementalTypes: ['Volt'],
          damageCategory: 'Weapon - Elemental damage',
        },
      ],
      maxStacks: 1,
      triggeredBy: {
        activeWeapon: 'Brevey',
        requirements: { activeBuff: 'brevey-buff-pact-amplification' },
      },
      endedBy: {
        notActiveWeapon: 'Brevey',
      },
      cooldown: 0,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 5 },
    },
    {
      id: 'brevey-damage-buff-pact-amplification-volt-6-star',
      displayName: 'Brevey - Pact Amplification Volt Buff 6*',
      description:
        "During Pact Amplification, when Pactcrest ☆ Metz is in the main slot, increase the Wanderer's volt damage by 25%. While Pact Amplification is active, increase volt and frost damage boost effects by 10% and 4% respectively.",
      damageBuffs: [
        {
          value: 0.35,
          elementalTypes: ['Volt'],
          damageCategory: 'Weapon - Elemental damage',
        },
      ],
      maxStacks: 1,
      triggeredBy: {
        activeWeapon: 'Brevey',
        requirements: { activeBuff: 'brevey-buff-pact-amplification' },
      },
      endedBy: {
        notActiveWeapon: 'Brevey',
      },
      cooldown: 0,
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
    {
      id: 'brevey-damage-buff-pact-amplification-frost',
      displayName: 'Brevey - Pact Amplification Frost Buff',
      description:
        "During Pact Amplification, when Pactcrest ☆ Metz is in the off-hand slot, increase the Wanderer's frost damage by 10%.",
      damageBuffs: [
        {
          value: 0.1,
          elementalTypes: ['Frost'],
          damageCategory: 'Weapon - Elemental damage',
        },
      ],
      maxStacks: 1,
      triggeredBy: {
        notActiveWeapon: 'Brevey',
        requirements: {
          activeBuff: 'brevey-buff-pact-amplification',
        },
      },
      endedBy: {
        activeWeapon: 'Brevey',
      },
      cooldown: 0,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 5 },
    },
    {
      id: 'brevey-damage-buff-pact-amplification-frost',
      displayName: 'Brevey - Pact Amplification Frost Buff',
      description:
        "During Pact Amplification, when Pactcrest ☆ Metz is in the off-hand slot, increase the Wanderer's frost damage by 10%.",
      damageBuffs: [
        {
          value: 0.14,
          elementalTypes: ['Frost'],
          damageCategory: 'Weapon - Elemental damage',
        },
      ],
      maxStacks: 1,
      triggeredBy: {
        notActiveWeapon: 'Brevey',
        requirements: {
          activeBuff: 'brevey-buff-pact-amplification',
        },
      },
      endedBy: {
        activeWeapon: 'Brevey',
      },
      cooldown: 0,
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
    {
      id: 'brevey-buff-3-star',
      displayName: 'Brevey - 3 star DMG buff',
      description:
        'When non-Benediction Resonances are active, gain 2 additional uses of Metz Energy Wave, and increase volt damage and frost damage to bosses by 10%.',
      maxStacks: 1,
      cooldown: 0,
      triggeredBy: {
        combatStart: true,
        requirements: { notWeaponResonance: 'Benediction' },
      },
      endedBy: { combatEnd: true },
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 6 },
      damageBuffs: [
        {
          value: 0.1,
          elementalTypes: ['Volt', 'Frost'],
          damageCategory: 'Weapon - Elemental damage',
        },
      ],
    },
    {
      id: 'brevey-buff-5-star',
      displayName: 'Brevey - 5 star DMG buff',
      description:
        'Increase damage dealt by Metz off-hand coordinated attack and Metz Energy Wave by 30%.',
      maxStacks: 1,
      cooldown: 0,
      triggeredBy: { combatStart: true, requirements: {} },
      endedBy: { combatEnd: true },
      starRequirement: { minStarRequirement: 5, maxStarRequirement: 6 },
      damageBuffs: [
        {
          value: 0.3,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'Flat multiplier',
          appliesTo: {
            attacks: ['brevey-metz-off-field-attack', 'metz-energy-wave'],
          },
        },
      ],
    },
  ],
  passiveAttacks: [
    {
      id: 'swift-cut',
      displayName: 'Brevey - Thunderbolt: Swift Cut',
      description:
        "Weapon discharge skills deal initial damage equal to 46.87% of volt ATK plus 0.62% of the Wanderer's Max HP plus 23.43% of the sum of all the Wanderer's resistance types plus 85.93% of crit to nearby targets. While in the combat state, after every 0.5 seconds, the next Swift Cut damage will be increased by an additional 1 time, up to a maximum of 30 times.",
      type: 'discharge',
      elementalType: { defaultElementalType: 'Volt' },
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 0.4687,
        attackFlat: 0,
        hpMultiplier: 0.0062,
        sumOfResistancesMultiplier: 0.2343,
        critFlatMultiplier: 0.8593,
        resourceAmountMultiplier: {
          resourceId: 'swift-cut',
          multiplier: 1,
        },
        canOnlyBeBuffedByTitans: true,
      },
      hitCount: { numberOfHitsFixed: 0 },
      triggeredBy: { startOfAnyDischargeAttack: true, requirements: {} },
      endedBy: { duration: minEventDuration },
      doesNotTriggerEvents: true,
      cooldown: 0,
      updatesResources: [
        {
          resourceId: 'swift-cut',
          depleteResource: true,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: 'brevey-metz-off-field-attack',
      displayName: 'Brevey - Metz off-hand coordinated attack',
      description:
        'While in the combat state, when Pactcrest ☆ Metz is in the off-hand slot, Metz remains on the battlefield for coordinated attacks. Metz is considered a summon, and each attack deals damage equal to 20% of ATK to nearby targets. The type of elemental damage dealt will be that of the current weapon.',
      type: 'passive',
      elementalType: {
        defaultElementalType: 'Volt',
        followCurrentWeaponElementalType: true,
      },
      damageModifiers: {
        damageDealtIsPerSecond: true,
        attackMultiplier: 0.66, // about 200 hits/60s * 20% atk/hit
        attackFlat: 0,
      },
      hitCount: { numberOfHitsPerSecond: 3 },
      triggeredBy: { notActiveWeapon: 'Brevey', requirements: {} },
      endedBy: { activeWeapon: 'Brevey' },
      cooldown: 0,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: 'metz-energy-wave',
      displayName: 'Brevey - Metz Energy Wave',
      description:
        'When Million-Metz Shockwave is on cooldown, dealing accumulated damage equal to 100 times of ATK during Pact Amplification grants 1 use of Metz Energy Wave each time. Metz Energy Wave: Deal damage equal to 1,800% of ATK to nearby targets. Gain up to 1 use every 10 seconds.',
      type: 'skill',
      elementalType: { defaultElementalType: 'Volt' },
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 18,
        attackFlat: 0,
      },
      hitCount: { numberOfHitsFixed: 1 },
      triggeredBy: {
        resourceUpdate: 'damage-accumulated-factor-of-total-attack',
        requirements: {
          activeBuff: 'brevey-buff-pact-amplification',
          hasResource: {
            resourceId: 'damage-accumulated-factor-of-total-attack',
            minAmount: 100,
          },
        },
      },
      endedBy: { duration: minEventDuration },
      doesNotTriggerEvents: true,
      cooldown: 10000,
      updatesResources: [
        {
          resourceId: 'damage-accumulated-factor-of-total-attack',
          depleteResource: true,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
      remarks:
        'For simplicity, Metz Energy Waves will always be used immediately',
    },
  ],
  resources: [
    {
      id: 'swift-cut',
      displayName: 'Swift cut',
      maxAmount: 30,
      regenerate: {
        amountPerSecond: 2,
      },
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: 'damage-accumulated-factor-of-total-attack',
      displayName: 'Damage accumulated (as factor of attack)',
      maxAmount: 300,
      regenerate: {
        amountFromAccumulatedDamageAsFactorOfTotalAttack: true,
      },
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
      remarks:
        'Used to track the amount of damage accumulated, one unit is 1 times the total ATK',
    },
  ],
} satisfies WeaponDefinition;
