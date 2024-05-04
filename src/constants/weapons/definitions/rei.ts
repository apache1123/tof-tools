import type { WeaponDefinition } from "../../../models/weapon-definition";
import { chargeResourceId, fullCharge } from "../../resources";
import { minEventDuration } from "../../tick";

export const rei = {
  id: 'Rei',
  displayName: 'Rei',
  resonanceElements: ['Volt', 'Frost'],
  calculationElements: ['Volt', 'Frost'],
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
      id: 'Energy Consumption - Volt',
      displayName: 'Energy Consumption',
      description: '+15% volt ATK when Energy Consumption is active',
      value: 0.15,
      elementalTypes: ['Volt'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 6,
    },
    {
      id: 'Energy Consumption - Frost',
      displayName: 'Energy Consumption',
      description: '+5% volt ATK when Energy Consumption is active',
      value: 0.05,
      elementalTypes: ['Frost'],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 6,
    },
  ],
  critRateBuffs: [],
  normalAttacks: [
    {
      id: 'rei-normal-auto-chain',
      displayName: 'Rei - Normal auto chain',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 7.36,
        attackFlat: 4416,
      },
      hitCount: { numberOfHitsFixed: 5 },
      cooldown: 0,
      triggeredBy: { playerInput: true },
      endedBy: { duration: 2650 },
      requirements: {},
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: 'rei-normal-backjump-arrow',
      displayName: 'Rei - Backjump Arrow',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 2.72,
        attackFlat: 1632,
      },
      hitCount: {
        numberOfHitsFixed: 1,
      },
      cooldown: 0,
      triggeredBy: {
        playerInput: true,
      },
      endedBy: { duration: 630 },
      requirements: {},
      updatesResources: [
        {
          resourceId: chargeResourceId,
          amount: 500,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: 'rei-normal-dodging-rapidfire',
      displayName: 'Rei - Dodging Rapidfire',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'normal',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 30,
        attackFlat: 17999,
      },
      hitCount: {
        numberOfHitsFixed: 5,
      },
      cooldown: 0,
      triggeredBy: {
        playerInput: true,
      },
      endedBy: { duration: 3170 },
      requirements: {
        activeBuff: 'rei-energy-consumption',
      },
      updatesResources: [],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  dodgeAttacks: [],
  skills: [
    {
      id: 'rei-skill-mecha-strike',
      displayName: 'Rei - Mecha Strike',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'skill',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 10.08,
        attackFlat: 6048,
      },
      hitCount: {
        numberOfHitsFixed: 1,
      },
      endedBy: { duration: 1050 },
      cooldown: 20000,
      triggeredBy: {
        playerInput: true,
      },
      requirements: {},
      updatesResources: [
        {
          resourceId: chargeResourceId,
          amount: 500,
        },
        {
          resourceId: 'rei-special-energy',
          amount: 35,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 4 },
    },
    {
      id: 'rei-skill-mecha-strike-5-star',
      displayName: 'Rei - Mecha Strike',
      elementalType: { defaultElementalType: 'Volt' },
      type: 'skill',
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 10.08,
        attackFlat: 6048,
      },
      hitCount: {
        numberOfHitsFixed: 1,
      },
      endedBy: { duration: 1050 },
      cooldown: 20000,
      triggeredBy: {
        playerInput: true,
      },
      requirements: {},
      updatesResources: [
        {
          resourceId: chargeResourceId,
          amount: 500,
        },
        {
          resourceId: 'rei-special-energy',
          amount: 60,
        },
      ],
      starRequirement: { minStarRequirement: 5, maxStarRequirement: 6 },
    },
  ],
  discharge: {
    id: 'rei-discharge',
    displayName: 'Rei discharge [placeholder]',
    elementalType: { defaultElementalType: 'Volt' },
    type: 'discharge',
    damageModifiers: {
      damageDealtIsPerSecond: false,
      attackMultiplier: 13.37,
      attackFlat: 8021,
    },
    hitCount: {
      numberOfHitsFixed: 1,
    },
    endedBy: { duration: 1667 },
    cooldown: 0,
    requirements: {
      hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
      notActiveWeapon: 'Rei',
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
  triggeredAttacks: [
    {
      id: 'detachment',
      displayName: 'Rei - Flash: Detachment',
      description:
        'After using Mecha Strike, deal damage equal to a % of ATK plus a % of Max HP plus a % of the sum of all resistance types plus a % of crit to target every second for 30 seconds',
      type: 'other', // TODO: this calculates as skill damage but appears as other damage in damage summary
      elementalType: { defaultElementalType: 'Volt' },
      damageModifiers: {
        damageDealtIsPerSecond: true,
        attackMultiplier: 1.094,
        attackFlat: 0,
        hpMultiplier: 0.156,
        sumOfResistancesMultiplier: 0.563,
        critFlatMultiplier: 2.109,
        canOnlyBeBuffedByTitans: true,
      },
      hitCount: {
        numberOfHitsFixed: 0,
      },
      triggeredBy: {
        endOfAttacks: ['rei-skill-mecha-strike'],
      },
      endedBy: { duration: 30000 },
      cooldown: 30000,
      requirements: {},
      updatesResources: [
        {
          resourceId: chargeResourceId,
          amount: 0,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: 'detachment',
      displayName: 'Rei - Flash: Detachment - physical/flame equipped',
      description:
        'After using Mecha Strike, deal damage equal to a % of ATK plus a % of Max HP plus a % of the sum of all resistance types plus a % of crit to target every second for 30 seconds. If any 1 physical or flame weapon is equipped, Flash damage is increased to 1.3 times.',
      type: 'other', // TODO: this calculates as skill damage but appears as other damage in damage summary
      elementalType: { defaultElementalType: 'Volt' },
      damageModifiers: {
        damageDealtIsPerSecond: true,
        attackMultiplier: 1.4222,
        attackFlat: 0,
        hpMultiplier: 0.2028,
        sumOfResistancesMultiplier: 0.7319,
        critFlatMultiplier: 2.7417,
        canOnlyBeBuffedByTitans: true,
      },
      hitCount: {
        numberOfHitsFixed: 0,
      },
      triggeredBy: {
        endOfAttacks: ['rei-skill-mecha-strike'],
      },
      endedBy: { duration: 30000 },
      cooldown: 30000,
      requirements: {
        elementalTypeWeaponsInTeam: [
          {
            elementalType: 'Physical',
            numOfWeapons: 1,
          },
          {
            elementalType: 'Physical',
            numOfWeapons: 2,
          },
          {
            elementalType: 'Flame',
            numOfWeapons: 1,
          },
          {
            elementalType: 'Flame',
            numOfWeapons: 2,
          },
        ],
      },
      updatesResources: [
        {
          resourceId: chargeResourceId,
          amount: 0,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: 'rei-homing-arrow',
      displayName: 'Rei - Homing Arrow',
      description:
        'When using any weapon to deal damage, fire 1 Homing Arrow toward the targets, dealing damage equal to 120% of ATK to the first target hit. Homing Arrow can trigger up to 1 time every 0.5 seconds.',
      type: 'passive',
      elementalType: { defaultElementalType: 'Volt' },
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 1.2,
        attackFlat: 0,
      },
      hitCount: {
        numberOfHitsFixed: 0,
      },
      triggeredBy: {
        hitOfAnyAttack: true,
      },
      endedBy: {
        duration: minEventDuration,
      },
      cooldown: 700, // This is hard to simulate accurately. This value seems to work ok to approximate the effect
      requirements: {},
      updatesResources: [
        {
          resourceId: 'rei-homing-arrows-on-enemy',
          amount: 1,
        },
        {
          resourceId: 'rei-special-energy',
          amount: 4,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: 'rei-homing-arrow-explosion',
      displayName: 'Rei - Homing Arrow explosion',
      description:
        'When the number of Homing Arrows on a target reaches 3, the arrows will detonate, dealing damage equal to 360% of ATK to nearby targets.',
      type: 'passive',
      elementalType: { defaultElementalType: 'Volt' },
      damageModifiers: {
        damageDealtIsPerSecond: false,
        attackMultiplier: 3.6,
        attackFlat: 0,
      },
      hitCount: { numberOfHitsFixed: 0 },
      triggeredBy: { resourceUpdate: 'rei-homing-arrows-on-enemy' },
      endedBy: { duration: minEventDuration },
      cooldown: 0,
      requirements: {
        hasResource: {
          resourceId: 'rei-homing-arrows-on-enemy',
          minAmount: 3,
        },
      },
      updatesResources: [
        {
          resourceId: 'rei-homing-arrows-on-enemy',
          amount: -3,
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  buffs: [
    {
      id: 'rei-overloaded',
      displayName: 'Rei: Overloaded',
      description:
        'Homing arrow applies Overload for 30 seconds. Increase the volt damage dealt to targets with Homing Arrow: Overloaded by 10% and frost damage by 10%',
      cooldown: 0,
      maxStacks: 1,
      triggeredBy: {
        endOfAttacks: ['rei-homing-arrow'],
      },
      endedBy: {
        duration: 30000,
      },
      requirements: {},
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 6 },
      damageBuffs: [
        {
          value: 0.1,
          elementalTypes: ['Volt', 'Frost'],
          damageCategory: '[TEMP_UNKNOWN]',
        },
      ],
    },
    {
      id: 'rei-energy-consumption',
      displayName: 'Rei: Energy Consumption',
      description:
        'If special energy is greater than 70 when performing Backjump Arrow, trigger Energy Consumption. Increase volt ATK by 15% and frost ATK by 5%.',
      cooldown: 0,
      maxStacks: 1,
      triggeredBy: {
        endOfAttacks: ['rei-normal-backjump-arrow'],
      },
      endedBy: {
        resourceDepleted: 'rei-special-energy',
      },
      requirements: {
        hasResource: {
          resourceId: 'rei-special-energy',
          minAmount: 70,
        },
      },
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
      attackBuffs: [
        {
          value: 0.15,
          elementalTypes: ['Volt'],
        },
        {
          value: 0.05,
          elementalTypes: ['Frost'],
        },
      ],
    },
    {
      id: 'rei-energy-consumption-6-star',
      displayName: 'Rei: Energy Consumption 6 star DMG buff',
      description: 'Increase volt DMG by 16% and frost DMG by 10%.',
      cooldown: 0,
      maxStacks: 1,
      triggeredBy: {
        endOfAttacks: ['rei-normal-backjump-arrow'],
      },
      endedBy: {
        resourceDepleted: 'rei-special-energy',
      },
      requirements: {
        hasResource: {
          resourceId: 'rei-special-energy',
          minAmount: 70,
        },
      },
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
      damageBuffs: [
        {
          value: 0.16,
          elementalTypes: ['Volt'],
          damageCategory: '[TEMP_UNKNOWN]',
        },
        {
          value: 0.1,
          elementalTypes: ['Frost'],
          damageCategory: '[TEMP_UNKNOWN]',
        },
      ],
    },
    {
      id: 'rei-energy-consumption-drain-on-field-buff',
      displayName: 'Rei: Energy Consumption on-field buff',
      description:
        "While Salvation is in the main slot, consume 5 special energy every 0.5 seconds. Increase Salvation's damage dealt by 30%.",
      cooldown: 0,
      maxStacks: 1,
      triggeredBy: {
        startOfBuff: 'rei-energy-consumption',
        activeWeapon: 'Rei',
      },
      endedBy: {
        notActiveWeapon: 'Rei',
        buffEnd: 'rei-energy-consumption',
      },
      requirements: {
        activeWeapon: 'Rei',
        activeBuff: 'rei-energy-consumption',
      },
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
      damageBuffs: [
        {
          value: 0.3,
          elementalTypes: ['Volt'],
          damageCategory: 'Weapon damage increase',
          appliesTo: {
            weapon: 'Rei',
          },
        },
      ],
      updatesResources: [
        {
          resourceId: 'rei-special-energy',
          amountPerSecond: -10,
          hasPriority: true,
        },
      ],
    },
    {
      id: 'rei-energy-consumption-drain-off-field-buff',
      displayName: 'Rei: Energy Consumption off-field buff',
      description:
        "While Salvation is in the off-hand slot, consume 3.3 special energy every 0.5 seconds. Increase Homing Arrow's damage by 50%",
      cooldown: 0,
      maxStacks: 1,
      triggeredBy: {
        startOfBuff: 'rei-energy-consumption',
        notActiveWeapon: 'Rei',
      },
      endedBy: {
        activeWeapon: 'Rei',
        buffEnd: 'rei-energy-consumption',
      },
      requirements: {
        notActiveWeapon: 'Rei',
        activeBuff: 'rei-energy-consumption',
      },
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
      miscBuff: {}, // TODO:
      updatesResources: [
        {
          resourceId: 'rei-special-energy',
          amountPerSecond: -6.6,
          hasPriority: true,
        },
      ],
    },
  ],
  resources: [
    {
      id: 'rei-special-energy',
      displayName: 'Rei - Special energy',
      maxAmount: 100,
      startingAmount: 100,
    },
    {
      id: 'rei-homing-arrows-on-enemy',
      displayName: 'Rei - Number of homing arrows on enemy',
      maxAmount: 3,
    },
  ],
} satisfies WeaponDefinition;