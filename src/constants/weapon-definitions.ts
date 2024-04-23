import type { Data } from '../models/data';
import type { WeaponDefinition } from '../models/weapon-definition';
import {
  chargeResourceId,
  dodgeResourceId,
  enduranceResourceId,
  fullCharge,
} from './resources';
import { minActionDuration } from './tick';

export type WeaponName =
  | 'Alyss'
  | 'Annabella'
  | 'Asuka'
  | 'Brevey'
  | 'Claudia'
  | 'Cobalt-B'
  | 'Cocoritter'
  | 'Crow'
  | 'Fei Se'
  | 'Fenrir'
  | 'Fiona'
  | 'Frigg'
  | 'Gnonno'
  | 'Huang (Mimi)'
  | 'Huma'
  | 'Icarus'
  | 'King'
  | 'Lan'
  | 'Lin'
  | 'Ling Han'
  | 'Liu Huo'
  | 'Lyra'
  | 'Meryl'
  | 'Ming Jing'
  | 'Nan Yin'
  | 'Nemesis'
  | 'Plotti'
  | 'Rei'
  | 'Rubilia'
  | 'Ruby'
  | 'Saki Fuwa'
  | 'Samir'
  | 'Shiro'
  | 'Tian Lang'
  | 'Tsubasa'
  | 'Umi'
  | 'Yan Miao'
  | 'Yanuo'
  | 'Yu Lan'
  | 'Zero';

export const weaponDefinitions: Data<WeaponName, WeaponDefinition> = {
  allIds: [
    'Alyss',
    'Annabella',
    'Asuka',
    'Brevey',
    'Claudia',
    'Cobalt-B',
    'Cocoritter',
    'Crow',
    'Fei Se',
    'Fenrir',
    'Fiona',
    'Frigg',
    'Gnonno',
    'Huang (Mimi)',
    'Huma',
    'Icarus',
    'King',
    'Lan',
    'Lin',
    'Ling Han',
    'Liu Huo',
    'Lyra',
    'Meryl',
    'Ming Jing',
    'Nan Yin',
    'Nemesis',
    'Plotti',
    'Rei',
    'Rubilia',
    'Ruby',
    'Saki Fuwa',
    'Samir',
    'Shiro',
    'Tian Lang',
    'Tsubasa',
    'Umi',
    'Yan Miao',
    'Yanuo',
    'Yu Lan',
    'Zero',
  ],
  byId: {
    Alyss: {
      id: 'Alyss',
      displayName: 'Alyss',
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
        id: 'alyss-discharge',
        displayName: 'Alyss discharge [placeholder]',
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
          notActiveWeapon: 'Alyss',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Annabella: {
      id: 'Annabella',
      displayName: 'Annabella',
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
      ],
      critRateBuffs: [
        {
          id: 'Tranquil Heart',
          displayName: 'Tranquil Heart',
          description:
            'Tranquil Heart: after using discharge/skill/dodge/charge attack, increase crit rate by 5%, stacking up to 3 times. Lasts for 15s.',
          value: 0.15,
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 0,
          maxStarRequirement: 2,
        },
        {
          id: 'Tranquil Heart',
          displayName: 'Tranquil Heart',
          description:
            'Tranquil Heart: after using discharge/skill/dodge/charge attack, increase crit rate by 9%, stacking up to 3 times. Lasts for 15s.',
          value: 0.27,
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 3,
          maxStarRequirement: 6,
        },
      ],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'annabella-discharge',
        displayName: 'Annabella discharge [placeholder]',
        elementalType: { defaultElementalType: 'Flame' },
        type: 'discharge',
        damageModifiers: {
          attackMultiplier: 0,
          attackFlat: 0,
          damageDealtIsPerSecond: false,
        },
        hitCount: {
          numberOfHitsFixed: 1,
        },
        endedBy: { duration: 5000 },
        cooldown: 0,
        requirements: {
          hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
          notActiveWeapon: 'Annabella',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Asuka: {
      id: 'Asuka',
      displayName: 'Asuka',
      resonanceElements: ['Physical', 'Flame'],
      calculationElements: ['Physical', 'Flame'],
      damageElement: 'Physical',
      type: 'Defense',
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: ['Physical'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: ['Physical'],
        },
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
        id: 'asuka-discharge',
        displayName: 'Asuka discharge [placeholder]',
        elementalType: { defaultElementalType: 'Physical' },
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
          notActiveWeapon: 'Asuka',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Brevey: {
      id: 'Brevey',
      displayName: 'Brevey',
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
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              // TODO: this is a placeholder value
              amount: 500,
            },
          ],
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
          hitCount: {
            numberOfHitsFixed: 6, // TODO: this assumes duration is 1s
          },
          cooldown: 0,
          triggeredBy: {
            playerInput: true,
          },
          endedBy: {
            duration: 1000, // TODO: what to do about hold attacks with no duration?
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              amount: 100, // TODO: placeholder. Assuming duration is 1s. Maybe a per second option is needed
            },
            {
              resourceId: enduranceResourceId,
              amount: -21, // Assuming duration is 1s. TODO: maybe an amountPerSecond option is needed
            },
          ],
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
          triggeredBy: {
            playerInput: true,
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              amount: 100,
            },
          ],
        },
      ],
      discharge: {
        id: 'brevey-discharge',
        displayName: 'Brevey discharge [placeholder]',
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
          notActiveWeapon: 'Brevey',
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
      },
      buffs: [
        {
          id: 'brevey-buff-pact-amplification',
          displayName: 'Brevey - Pact Amplification',
          description: '',
          maxStacks: 1,
          triggeredBy: {
            weaponAttacks: ['brevey-skill-million-metz-shockwave'],
          },
          endedBy: {
            duration: 30000,
          },
          cooldown: 30000,
          requirements: {},
          minStarRequirement: 0,
          maxStarRequirement: 6,
        },
        {
          id: 'brevey-buff-metz-energy-wave-charges',
          displayName: 'Brevey - Metz Energy Wave charges',
          description: '',
          maxStacks: 3,
          additionallyGainStacksBy: {
            accumulatedDamageThreshold: {
              timesOfAttack: 100,
            },
          },
          triggeredBy: {
            weaponAttacks: ['brevey-skill-million-metz-shockwave'],
          },
          endedBy: {
            duration: 30000,
          },
          cooldown: 10000,
          requirements: {},
          minStarRequirement: 0,
          maxStarRequirement: 6,
        },
        {
          id: 'brevey-damage-buff-pact-amplification-volt',
          displayName: 'Brevey - Pact Amplification Volt Buff',
          description:
            "During Pact Amplification, when Pactcrest ☆ Metz is in the main slot, increase the Wanderer's volt damage by 25%.",
          damageBuff: {
            value: 0.25,
            elementalTypes: ['Volt'],
            damageCategory: '[TEMP_UNKNOWN]',
          },
          maxStacks: 1,
          triggeredBy: {
            activeWeapon: 'Brevey',
          },
          endedBy: {
            notActiveWeapon: 'Brevey',
          },
          cooldown: 0,
          requirements: {
            activeBuff: 'brevey-buff-pact-amplification',
          },
          minStarRequirement: 0,
          maxStarRequirement: 6,
        },
        {
          id: 'brevey-damage-buff-pact-amplification-frost',
          displayName: 'Brevey - Pact Amplification Frost Buff',
          description:
            "During Pact Amplification, when Pactcrest ☆ Metz is in the off-hand slot, increase the Wanderer's frost damage by 10%.",
          damageBuff: {
            value: 0.25,
            elementalTypes: ['Frost'],
            damageCategory: '[TEMP_UNKNOWN]',
          },
          maxStacks: 1,
          triggeredBy: {
            notActiveWeapon: 'Brevey',
          },
          endedBy: {
            activeWeapon: 'Brevey',
          },
          cooldown: 0,
          requirements: {
            activeBuff: 'brevey-buff-pact-amplification',
          },
          minStarRequirement: 0,
          maxStarRequirement: 6,
        },
      ],
      triggeredAttacks: [],
      resources: [],
    },
    Claudia: {
      id: 'Claudia',
      displayName: 'Claudia',
      resonanceElements: ['Physical'],
      calculationElements: ['Physical'],
      damageElement: 'Physical',
      type: 'DPS',
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: ['Physical'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: ['Physical'],
        },
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'claudia-discharge',
        displayName: 'Claudia discharge [placeholder]',
        elementalType: { defaultElementalType: 'Physical' },
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
          notActiveWeapon: 'Claudia',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Cobalt-B': {
      id: 'Cobalt-B',
      displayName: 'Cobalt-B',
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
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'cobaltb-discharge',
        displayName: 'Cobalt-B discharge [placeholder]',
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
          notActiveWeapon: 'Cobalt-B',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Cocoritter: {
      id: 'Cocoritter',
      displayName: 'Cocoritter',
      resonanceElements: ['Frost'],
      calculationElements: ['Frost'],
      damageElement: 'Frost',
      type: 'Support',
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
          id: 'Frost Benediction',
          displayName: 'Frost Benediction',
          description:
            "+5% entire team's frost ATK by 5% when Benediction Resonance is active",
          value: 0.05,
          elementalTypes: ['Frost'],
          canStack: true,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          weaponResonanceRequirements: ['Benediction'],
        },
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'coco-discharge',
        displayName: 'Cocoritter discharge [placeholder]',
        elementalType: { defaultElementalType: 'Frost' },
        type: 'discharge',
        damageModifiers: {
          damageDealtIsPerSecond: false,
          attackMultiplier: 0,
          attackFlat: 0,
        },
        hitCount: {
          numberOfHitsFixed: 0,
        },
        endedBy: { duration: 5000 },
        cooldown: 0,
        requirements: {
          hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
          notActiveWeapon: 'Cocoritter',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Crow: {
      id: 'Crow',
      displayName: 'Crow',
      resonanceElements: ['Volt'],
      calculationElements: ['Volt'],
      damageElement: 'Volt',
      type: 'DPS',
      attackPercentBuffs: [],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'crow-discharge',
        displayName: 'Crow discharge [placeholder]',
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
          notActiveWeapon: 'Crow',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Fei Se': {
      id: 'Fei Se',
      displayName: 'Fei Se',
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
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [
        {
          id: 'feise-skill-whirling',
          displayName: 'Fei Se - Whirling [placeholder]',
          elementalType: { defaultElementalType: 'Flame' },
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
          cooldown: 20000,
          triggeredBy: {
            playerInput: true,
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              amount: 0,
            },
          ],
        },
      ],
      discharge: {
        id: 'feise-discharge',
        displayName: 'Fei Se discharge [placeholder]',
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
          notActiveWeapon: 'Fei Se',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Fenrir: {
      id: 'Fenrir',
      displayName: 'Fenrir',
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
          id: 'Elemental Balancing',
          displayName: 'Elemental Balancing',
          description:
            '+15% all ATK by equipping 3 weapons of different elements',
          value: 0.15,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: ['None'],
        },
      ],
      critRateBuffs: [
        {
          id: 'Fenrir 6*',
          displayName: 'Fenrir 6*',
          description: 'Active when Fenrir is on-field + 5s off-field',
          value: 0.18,
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 6,
          maxStarRequirement: 6,
        },
      ],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'fenrir-discharge',
        displayName: 'Fenrir discharge [placeholder]',
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
          notActiveWeapon: 'Fenrir',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Fiona: {
      id: 'Fiona',
      displayName: 'Fiona',
      resonanceElements: ['Altered'],
      calculationElements: ['Altered'],
      damageElement: 'Altered',
      type: 'Support',
      attackPercentBuffs: [
        {
          id: 'Altered Resonance',
          displayName: 'Altered Resonance',
          description: '+20% ATK when equipping 2 or more altered weapons',
          value: 0.2,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: ['Altered'],
        },
        {
          id: 'Fiona discharge',
          displayName: 'Fiona discharge',
          description: '+15% ATK for 30s on discharge',
          value: 0.15,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          weaponResonanceRequirements: ['Attack', 'Balance'],
        },
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'fiona-discharge',
        displayName: 'Fiona discharge [placeholder]',
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
          notActiveWeapon: 'Fiona',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Frigg: {
      id: 'Frigg',
      displayName: 'Frigg',
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
          id: 'Frost Domain',
          displayName: 'Frost Domain',
          description: 'Frost Domain gives +15% frost ATK',
          value: 0.15,
          elementalTypes: ['Frost'],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 0,
          maxStarRequirement: 5,
        },
        {
          id: 'Frost Domain',
          displayName: 'Frost Domain',
          description: 'Frost Domain gives +40% frost ATK',
          value: 0.4,
          elementalTypes: ['Frost'],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 6,
          maxStarRequirement: 6,
        },
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'frigg-discharge',
        displayName: 'Frigg discharge [placeholder]',
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
          notActiveWeapon: 'Frigg',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Gnonno: {
      id: 'Gnonno',
      displayName: 'Gnonno',
      resonanceElements: ['Physical'],
      calculationElements: ['Physical'],
      damageElement: 'Physical',
      type: 'DPS',
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: ['Physical'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: ['Physical'],
        },
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'gnonno-discharge',
        displayName: 'Gnonno discharge [placeholder]',
        elementalType: { defaultElementalType: 'Physical' },
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
          notActiveWeapon: 'Gnonno',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Huang (Mimi)': {
      id: 'Huang (Mimi)',
      displayName: 'Huang (Mimi)',
      resonanceElements: ['Volt'],
      calculationElements: ['Volt'],
      damageElement: 'Volt',
      type: 'Defense',
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
      ],
      critRateBuffs: [],
      normalAttacks: [
        {
          id: 'mimi-normal-auto-chain',
          displayName: 'Mimi - Auto chain',
          elementalType: { defaultElementalType: 'Volt' },
          type: 'normal',
          damageModifiers: {
            damageDealtIsPerSecond: false,
            attackMultiplier: 11.257,
            attackFlat: 59,
          },
          hitCount: {
            numberOfHitsFixed: 5,
          },
          endedBy: { duration: 3370 },
          cooldown: 0,
          triggeredBy: {
            playerInput: true,
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              // TODO:
              amount: 0,
            },
          ],
        },
      ],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'mimi-discharge',
        displayName: 'Mimi - Discharge [placeholder]',
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
          notActiveWeapon: 'Huang (Mimi)',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Huma: {
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Icarus: {
      id: 'Icarus',
      displayName: 'Icarus',
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
        id: 'icarus-discharge',
        displayName: 'Icarus discharge [placeholder]',
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
          notActiveWeapon: 'Icarus',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    King: {
      id: 'King',
      displayName: 'King',
      resonanceElements: ['Flame'],
      calculationElements: ['Flame'],
      damageElement: 'Flame',
      type: 'DPS',
      attackPercentBuffs: [],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'king-discharge',
        displayName: 'King discharge [placeholder]',
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
          notActiveWeapon: 'King',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Lan: {
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Lin: {
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Ling Han': {
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Liu Huo': {
      id: 'Liu Huo',
      displayName: 'Liu Huo',
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
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'liuhuo-discharge',
        displayName: 'Liu Huo discharge [placeholder]',
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
          notActiveWeapon: 'Liu Huo',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Lyra: {
      id: 'Lyra',
      displayName: 'Lyra',
      resonanceElements: ['Physical'],
      calculationElements: ['Physical'],
      damageElement: 'Physical',
      type: 'Support',
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: ['Physical'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: ['Physical'],
        },
        {
          id: 'Physical Benediction',
          displayName: 'Physical Benediction',
          description:
            "+5% entire team's physical ATK by 5% when Benediction Resonance is active",
          value: 0.05,
          elementalTypes: ['Physical'],
          canStack: true,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          weaponResonanceRequirements: ['Benediction'],
        },
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'lyra-discharge',
        displayName: 'Lyra discharge [placeholder]',
        elementalType: { defaultElementalType: 'Physical' },
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
          notActiveWeapon: 'Lyra',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Meryl: {
      id: 'Meryl',
      displayName: 'Meryl',
      resonanceElements: ['Frost'],
      calculationElements: ['Frost'],
      damageElement: 'Frost',
      type: 'Defense',
      attackPercentBuffs: [],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'meryl-discharge',
        displayName: 'Meryl discharge [placeholder]',
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
          notActiveWeapon: 'Meryl',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Ming Jing': {
      id: 'Ming Jing',
      displayName: 'Ming Jing (Zeke)',
      resonanceElements: ['Physical', 'Flame'],
      calculationElements: ['Physical', 'Flame'],
      damageElement: 'Physical',
      type: 'DPS',
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: ['Physical'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: ['Physical'],
        },
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
      normalAttacks: [
        {
          id: 'mingjing-auto-chain',
          displayName: 'Ming Jing - auto chain [placeholder]',
          elementalType: { defaultElementalType: 'Physical' },
          type: 'normal',
          damageModifiers: {
            damageDealtIsPerSecond: false,
            attackMultiplier: 0,
            attackFlat: 0,
          },
          hitCount: {
            numberOfHitsFixed: 5,
          },
          endedBy: { duration: 5000 },
          cooldown: 0,
          triggeredBy: {
            playerInput: true,
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              amount: 0,
            },
          ],
        },
      ],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'mingjing-discharge',
        displayName: 'Ming Jing discharge [placeholder]',
        elementalType: { defaultElementalType: 'Physical' },
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
          notActiveWeapon: 'Ming Jing',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Nan Yin': {
      id: 'Nan Yin',
      displayName: 'Nan Yin',
      resonanceElements: ['Altered'],
      calculationElements: ['Altered'],
      damageElement: 'Altered',
      type: 'DPS',
      attackPercentBuffs: [
        {
          id: 'The Final Tune',
          displayName: 'The Final Tune',
          description:
            '+30% ATK when equipping 3 altered weapons, works off-hand',
          value: 0.3,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalWeaponsRequirements: [
            {
              weaponElementalType: 'Altered',
              minNumOfWeapons: 3,
            },
          ],
        },
      ],
      critRateBuffs: [],
      normalAttacks: [
        {
          id: 'nanyin-normal-auto-chain',
          displayName: 'Nan Yin - Auto chain',
          elementalType: {
            defaultElementalType: 'Altered',
            followLastWeaponElementalType: true,
          },
          type: 'normal',
          damageModifiers: {
            damageDealtIsPerSecond: false,
            attackMultiplier: 11.98,
            attackFlat: 63,
          },
          hitCount: {
            numberOfHitsFixed: 5,
          },
          endedBy: { duration: 6000 },
          cooldown: 0,
          triggeredBy: {
            playerInput: true,
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              // TODO:
              amount: 0,
            },
          ],
        },
      ],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'nanyin-discharge',
        displayName: 'Nan Yin - discharge',
        elementalType: {
          defaultElementalType: 'Altered',
          followLastWeaponElementalType: true,
        },
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
        requirements: {
          hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
          notActiveWeapon: 'Nan Yin',
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
      },
      buffs: [
        {
          id: 'nanyin-atk-buff-the-final-tune',
          displayName: 'Nan Yin - The final tune',
          description: '',
          attackBuff: {
            value: 0.3,
            elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          },
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          endedBy: {
            combatEnd: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: [
              {
                elementalType: 'Altered',
                numOfWeapons: 3,
              },
            ],
          },
          minStarRequirement: 0,
          maxStarRequirement: 6,
        },
      ],
      triggeredAttacks: [],
      resources: [],
    },
    Nemesis: {
      id: 'Nemesis',
      displayName: 'Nemesis',
      resonanceElements: ['Volt'],
      calculationElements: ['Volt'],
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
          id: 'Volt Benediction',
          displayName: 'Volt Benediction',
          description:
            "+5% entire team's volt ATK by 5% when Benediction Resonance is active",
          value: 0.05,
          elementalTypes: ['Volt'],
          canStack: true,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          weaponResonanceRequirements: ['Benediction'],
        },
        {
          id: 'Nemesis 5*',
          displayName: 'Nemesis 5*',
          description: '+10% ATK for having 1 electrode out',
          value: 0.1,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 5,
          maxStarRequirement: 5,
        },
        {
          id: 'Nemesis 6*',
          displayName: 'Nemesis 6*',
          description: '+15% ATK for having 2 electrode out',
          value: 0.15,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 6,
          maxStarRequirement: 6,
        },
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'nemesis-discharge',
        displayName: 'Nemesis discharge [placeholder]',
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
          notActiveWeapon: 'Nemesis',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Plotti: {
      id: 'Plotti',
      displayName: 'Plotti',
      resonanceElements: ['Flame', 'Physical'],
      calculationElements: ['Flame', 'Physical'],
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
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: ['Physical'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: ['Physical'],
        },
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'plotti-discharge',
        displayName: 'Plotti discharge [placeholder]',
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
          notActiveWeapon: 'Plotti',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Rei: {
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
          id: 'rei-normal-backjump-arrow',
          displayName: 'Rei - Backjump Arrow',
          elementalType: { defaultElementalType: 'Volt' },
          type: 'normal',
          damageModifiers: {
            damageDealtIsPerSecond: false,
            attackMultiplier: 272,
            attackFlat: 1632,
          },
          hitCount: {
            numberOfHitsFixed: 1,
          },
          cooldown: 0,
          triggeredBy: {
            playerInput: true,
          },
          endedBy: { duration: 200 }, // TODO: placeholder
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              amount: 500,
            },
          ],
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
            attackFlat: 308,
          },
          hitCount: {
            numberOfHitsFixed: 1,
          },
          endedBy: { duration: 5000 },
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
        },
      ],
      discharge: {
        id: 'rei-discharge',
        displayName: 'Rei discharge [placeholder]',
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
      },
      triggeredAttacks: [
        {
          id: 'detachment',
          displayName: 'Rei - Flash: Detachment',
          description:
            'After using Mecha Strike, deal damage equal to a % of ATK plus a % of Max HP plus a % of the sum of all resistance types plus a % of crit to target every second for 30 seconds',
          type: 'other',
          elementalType: { defaultElementalType: 'Volt' },
          damageModifiers: {
            damageDealtIsPerSecond: true,
            attackMultiplier: 1.094,
            attackFlat: 0,
            hpMultiplier: 0.156,
            sumOfResistancesMultiplier: 0.563,
            critFlatMultiplier: 2.109,
            cannotBeDamageBuffedExceptByTitans: true,
          },
          hitCount: {
            numberOfHitsFixed: 0,
          },
          triggeredBy: {
            weaponAttacks: ['rei-skill-mecha-strike'],
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
        },
        {
          id: 'detachment',
          displayName: 'Rei - Flash: Detachment - physical/flame equipped',
          description:
            'After using Mecha Strike, deal damage equal to a % of ATK plus a % of Max HP plus a % of the sum of all resistance types plus a % of crit to target every second for 30 seconds. If any 1 physical or flame weapon is equipped, Flash damage is increased to 1.3 times.',
          type: 'skill',
          elementalType: { defaultElementalType: 'Volt' },
          damageModifiers: {
            damageDealtIsPerSecond: true,
            attackMultiplier: 1.4222,
            attackFlat: 0,
            hpMultiplier: 0.2028,
            sumOfResistancesMultiplier: 0.7319,
            critFlatMultiplier: 2.7417,
            cannotBeDamageBuffedExceptByTitans: true,
          },
          hitCount: {
            numberOfHitsFixed: 0,
          },
          triggeredBy: {
            weaponAttacks: ['rei-skill-mecha-strike'],
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
            hitOfAnyWeapon: true,
          },
          endedBy: {
            duration: minActionDuration,
          },
          cooldown: 500,
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
          hitCount: {
            numberOfHitsFixed: 0,
          },
          triggeredBy: {
            resourceUpdate: 'rei-homing-arrows-on-enemy',
          },
          endedBy: {
            duration: minActionDuration,
          },
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
            weaponAttacks: ['rei-homing-arrow'],
          },
          endedBy: {
            duration: 30000,
          },
          requirements: {},
          minStarRequirement: 6,
          maxStarRequirement: 6,
          damageBuff: {
            value: 0.1,
            elementalTypes: ['Volt', 'Frost'],
            damageCategory: '[TEMP_UNKNOWN]',
          },
        },
        {
          id: 'rei-energy-consumption',
          displayName: 'Rei: Energy Consumption',
          description:
            'If special energy is greater than 70 when performing Backjump Arrow, trigger Energy Consumption',
          cooldown: 0,
          maxStacks: 1,
          triggeredBy: {
            weaponAttacks: ['rei-normal-backjump-arrow'],
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
          minStarRequirement: 0,
          maxStarRequirement: 6,
        },
        {
          id: 'rei-energy-consumption-volt',
          displayName: 'Rei: Energy Consumption volt buff',
          description:
            'Energy Consumption: Increase volt ATK by 15% and frost ATK by 5%.',
          cooldown: 0,
          maxStacks: 1,
          triggeredBy: {
            buffStart: 'rei-energy-consumption',
          },
          endedBy: {
            buffEnd: 'rei-energy-consumption',
          },
          requirements: {},
          minStarRequirement: 0,
          maxStarRequirement: 6,
          attackBuff: {
            value: 0.15,
            elementalTypes: ['Volt'],
          },
        },
        {
          id: 'rei-energy-consumption-frost',
          displayName: 'Rei: Energy Consumption frost buff',
          description:
            'Energy Consumption: Increase volt ATK by 15% and frost ATK by 5%.',
          cooldown: 0,
          maxStacks: 1,
          triggeredBy: {
            buffStart: 'rei-energy-consumption',
          },
          endedBy: {
            buffEnd: 'rei-energy-consumption',
          },
          requirements: {},
          minStarRequirement: 0,
          maxStarRequirement: 6,
          attackBuff: {
            value: 0.05,
            elementalTypes: ['Frost'],
          },
        },
        {
          id: 'rei-energy-comsumption-drain-onfield',
          displayName: 'Rei: Energy Consumption on-field',
          description:
            "While Salvation is in the main slot, consume 5 special energy every 0.5 seconds. Increase Salvation's damage dealt by 30%.",
          cooldown: 0,
          maxStacks: 1,
          triggeredBy: {
            buffStart: 'rei-energy-consumption',
            activeWeapon: 'Rei',
          },
          endedBy: {
            notActiveWeapon: 'Rei',
          },
          requirements: {
            activeWeapon: 'Rei',
            activeBuff: 'rei-energy-consumption',
          },
          minStarRequirement: 0,
          maxStarRequirement: 6,
          miscBuff: {
            allAttackBuff: {
              forWeapon: 'Rei',
              value: 0.3,
            },
          },
          updatesResources: [
            {
              resourceId: 'rei-special-energy',
              amountPerSecond: -10,
            },
          ],
        },
      ],
      resources: [
        {
          id: 'rei-special-energy',
          displayName: 'Rei - Special energy',
          maxAmount: 100,
          cooldown: 0,
        },
        {
          id: 'rei-homing-arrows-on-enemy',
          displayName: 'Rei - Number of homing arrows on enemy',
          maxAmount: 3,
          cooldown: 0,
        },
      ],
    },
    Rubilia: {
      id: 'Rubilia',
      displayName: 'Rubilia',
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
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'rubilia-discharge',
        displayName: 'Rubilia discharge [placeholder]',
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
          notActiveWeapon: 'Rubilia',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Ruby: {
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Saki Fuwa': {
      id: 'Saki Fuwa',
      displayName: 'Saki Fuwa',
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
        id: 'saki-discharge',
        displayName: 'Saki discharge [placeholder]',
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
          notActiveWeapon: 'Saki Fuwa',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Samir: {
      id: 'Samir',
      displayName: 'Samir',
      resonanceElements: ['Volt'],
      calculationElements: ['Volt'],
      damageElement: 'Volt',
      type: 'DPS',
      attackPercentBuffs: [],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'samir-discharge',
        displayName: 'Samir discharge [placeholder]',
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
          notActiveWeapon: 'Samir',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Shiro: {
      id: 'Shiro',
      displayName: 'Shiro',
      resonanceElements: ['Physical'],
      calculationElements: ['Physical'],
      damageElement: 'Physical',
      type: 'DPS',
      attackPercentBuffs: [],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'shiro-discharge',
        displayName: 'Shiro discharge [placeholder]',
        elementalType: { defaultElementalType: 'Physical' },
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
          notActiveWeapon: 'Shiro',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Tian Lang': {
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Tsubasa: {
      id: 'Tsubasa',
      displayName: 'Tsubasa',
      resonanceElements: ['Frost'],
      calculationElements: ['Frost'],
      damageElement: 'Frost',
      type: 'DPS',
      attackPercentBuffs: [],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'tsubasa-discharge',
        displayName: 'Tsubasa discharge [placeholder]',
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
          notActiveWeapon: 'Tsubasa',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Umi: {
      id: 'Umi',
      displayName: 'Umi',
      resonanceElements: ['Physical'],
      calculationElements: ['Physical'],
      damageElement: 'Physical',
      type: 'DPS',
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: ['Physical'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: ['Physical'],
        },
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [
        {
          id: "umi-skill-it's-magic-time",
          displayName: "Umi skill - It's magic time",
          elementalType: { defaultElementalType: 'Physical' },
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
          cooldown: 0,
          triggeredBy: {
            playerInput: true,
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              amount: 0,
            },
          ],
        },
      ],
      discharge: {
        id: 'umi-discharge',
        displayName: 'Umi discharge [placeholder]',
        elementalType: { defaultElementalType: 'Physical' },
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
          notActiveWeapon: 'Umi',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Yan Miao': {
      id: 'Yan Miao',
      displayName: 'Yan Miao',
      resonanceElements: ['Physical', 'Flame'],
      calculationElements: ['Physical', 'Flame'],
      damageElement: 'Physical',
      type: 'DPS',
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: ['Physical'],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: ['Physical'],
        },
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
      normalAttacks: [
        {
          id: 'yanmiao-auto-chain',
          displayName: 'Yan Miao - auto chain [placeholder]',
          elementalType: { defaultElementalType: 'Physical' },
          type: 'normal',
          damageModifiers: {
            damageDealtIsPerSecond: false,
            attackMultiplier: 0,
            attackFlat: 0,
          },
          hitCount: {
            numberOfHitsFixed: 6,
          },
          endedBy: { duration: 5000 },
          cooldown: 0,
          triggeredBy: {
            playerInput: true,
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              amount: 0,
            },
          ],
        },
      ],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'yanmiao-discharge',
        displayName: 'Yan Miao discharge [placeholder]',
        elementalType: { defaultElementalType: 'Physical' },
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
          notActiveWeapon: 'Yan Miao',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Yanuo: {
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
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              // TODO: this is a placeholder value
              amount: 250,
            },
          ],
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
          triggeredBy: {
            playerInput: true,
          },
          requirements: {},
          updatesResources: [
            {
              resourceId: chargeResourceId,
              amount: 0,
            },
          ],
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
        requirements: {
          hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
          notActiveWeapon: 'Yanuo',
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    'Yu Lan': {
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
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
    Zero: {
      id: 'Zero',
      displayName: 'Zero',
      resonanceElements: ['Flame'],
      calculationElements: ['Flame'],
      damageElement: 'Flame',
      type: 'Support',
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
          id: 'Flame Benediction',
          displayName: 'Flame Benediction',
          description:
            "+5% entire team's flame ATK by 5% when Benediction Resonance is active",
          value: 0.05,
          elementalTypes: ['Flame'],
          canStack: true,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          weaponResonanceRequirements: ['Benediction'],
        },
      ],
      critRateBuffs: [],
      normalAttacks: [],
      dodgeAttacks: [],
      skills: [],
      discharge: {
        id: 'zero-discharge',
        displayName: 'Zero discharge [placeholder]',
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
          notActiveWeapon: 'Zero',
        },
        triggeredBy: {
          playerInput: true,
        },
        updatesResources: [
          { resourceId: chargeResourceId, amount: -fullCharge },
        ],
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
  },
};

export type WeaponType = 'DPS' | 'Support' | 'Defense';
