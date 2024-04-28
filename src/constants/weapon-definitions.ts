import type { Data } from '../models/data';
import type { WeaponDefinition } from '../models/weapon-definition';
import {
  chargeResourceId,
  dodgeResourceId,
  enduranceResourceId,
  fullCharge,
} from './resources';
import { minEventDuration } from './tick';

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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
          triggeredBy: { playerInput: true },
          endedBy: {
            duration: 2620, // TODO: what to do about hold attacks with no duration?
          },
          requirements: {},
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
            {
              resourceId: 'damage-accumulated-factor-of-total-attack',
              depleteResource: true,
            },
          ],
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
        },
      ],
      discharge: {
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
        requirements: {
          hasResource: { resourceId: chargeResourceId, minAmount: fullCharge },
          notActiveWeapon: 'Brevey',
        },
        triggeredBy: { playerInput: true },
        updatesResources: [
          {
            resourceId: chargeResourceId,
            amount: -fullCharge,
          },
        ],
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
      },
      buffs: [
        {
          id: 'brevey-buff-pact-amplification',
          displayName: 'Brevey - Pact Amplification',
          maxStacks: 1,
          triggeredBy: {
            endOfAttacks: ['brevey-skill-million-metz-shockwave'],
          },
          endedBy: {
            duration: 30000,
          },
          cooldown: 30000,
          requirements: {},
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
              damageCategory: '[TEMP_UNKNOWN]',
            },
          ],
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
              damageCategory: '[TEMP_UNKNOWN]',
            },
          ],
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
              damageCategory: '[TEMP_UNKNOWN]',
            },
          ],
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
              damageCategory: '[TEMP_UNKNOWN]',
            },
          ],
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
          starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
        },
        {
          id: 'brevey-buff-3-star',
          displayName: 'Brevey - 3 star DMG buff',
          description:
            'When non-Benediction Resonances are active, gain 2 additional uses of Metz Energy Wave, and increase volt damage and frost damage to bosses by 10%.',
          maxStacks: 1,
          cooldown: 0,
          triggeredBy: { combatStart: true },
          endedBy: { combatEnd: true },
          requirements: { notWeaponResonance: 'Benediction' },
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
          id: 'brevey-buff-5-star',
          displayName: 'Brevey - 5 star DMG buff',
          description:
            'Increase damage dealt by Metz off-hand coordinated attack and Metz Energy Wave by 30%.',
          maxStacks: 1,
          cooldown: 0,
          triggeredBy: { combatStart: true },
          endedBy: { combatEnd: true },
          requirements: {},
          starRequirement: { minStarRequirement: 5, maxStarRequirement: 6 },
          damageBuffs: [
            {
              value: 0.3,
              elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
              damageCategory: 'Weapon damage increase',
              appliesTo: {
                attacks: ['brevey-metz-off-field-attack', 'metz-energy-wave'],
              },
            },
          ],
        },
      ],
      triggeredAttacks: [
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
          triggeredBy: { startOfAnyDischargeAttack: true },
          endedBy: { duration: minEventDuration },
          doesNotTriggerEvents: true,
          cooldown: 0,
          requirements: {},
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
          triggeredBy: { notActiveWeapon: 'Brevey' },
          endedBy: { activeWeapon: 'Brevey' },
          cooldown: 0,
          requirements: {},
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
          },
          endedBy: { duration: minEventDuration },
          doesNotTriggerEvents: true,
          cooldown: 10000,
          requirements: {
            activeBuff: 'brevey-buff-pact-amplification',
            hasResource: {
              resourceId: 'damage-accumulated-factor-of-total-attack',
              minAmount: 100,
            },
          },
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
        },
        {
          id: 'damage-accumulated-factor-of-total-attack',
          displayName: 'Damage accumulated (as factor of attack)',
          maxAmount: 300,
          regenerate: {
            amountFromAccumulatedDamageAsFactorOfTotalAttack: true,
          },
          remarks:
            'Used to track the amount of damage accumulated, one unit is 1 times the total ATK',
        },
      ],
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
      },
      buffs: [
        {
          id: 'nanyin-atk-buff-the-final-tune',
          displayName: 'Nan Yin - The final tune',
          description: '',
          attackBuffs: [
            {
              value: 0.3,
              elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
            },
          ],
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
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
      normalAttacks: [
        {
          id: 'tsubasa-auto-chain',
          displayName: 'Tsubasa - auto chain [placeholder]',
          elementalType: { defaultElementalType: 'Frost' },
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
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
        },
      ],
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
          starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
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
        starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
      },
      buffs: [],
      triggeredAttacks: [],
      resources: [],
    },
  },
};

export type WeaponType = 'DPS' | 'Support' | 'Defense';
