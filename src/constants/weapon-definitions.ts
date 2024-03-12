import type { Data } from '../models/data';
import type { WeaponDefinition } from '../models/weapon-definition';

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
      elementalTypes: ['Frost'],
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
    },
    Annabella: {
      id: 'Annabella',
      displayName: 'Annabella',
      elementalTypes: ['Flame'],
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
    },
    Asuka: {
      id: 'Asuka',
      displayName: 'Asuka',
      elementalTypes: ['Physical', 'Flame'],
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
    },
    Brevey: {
      id: 'Brevey',
      displayName: 'Brevey',
      elementalTypes: ['Volt', 'Frost'],
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
    },
    Claudia: {
      id: 'Claudia',
      displayName: 'Claudia',
      elementalTypes: ['Physical'],
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
    },
    'Cobalt-B': {
      id: 'Cobalt-B',
      displayName: 'Cobalt-B',
      elementalTypes: ['Flame'],
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
    },
    Cocoritter: {
      id: 'Cocoritter',
      displayName: 'Cocoritter',
      elementalTypes: ['Frost'],
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
    },
    Crow: {
      id: 'Crow',
      displayName: 'Crow',
      elementalTypes: ['Volt'],
      type: 'DPS',
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    'Fei Se': {
      id: 'Fei Se',
      displayName: 'Fei Se',
      elementalTypes: ['Flame'],
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
    },
    Fenrir: {
      id: 'Fenrir',
      displayName: 'Fenrir',
      elementalTypes: ['Volt'],
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
    },
    Fiona: {
      id: 'Fiona',
      displayName: 'Fiona',
      elementalTypes: ['Altered'],
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
    },
    Frigg: {
      id: 'Frigg',
      displayName: 'Frigg',
      elementalTypes: ['Frost'],
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
    },
    Gnonno: {
      id: 'Gnonno',
      displayName: 'Gnonno',
      elementalTypes: ['Physical'],
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
    },
    'Huang (Mimi)': {
      id: 'Huang (Mimi)',
      displayName: 'Huang (Mimi)',
      elementalTypes: ['Volt'],
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
    },
    Huma: {
      id: 'Huma',
      displayName: 'Huma',
      elementalTypes: ['Flame'],
      type: 'Defense',
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    Icarus: {
      id: 'Icarus',
      displayName: 'Icarus',
      elementalTypes: ['Frost'],
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
    },
    King: {
      id: 'King',
      displayName: 'King',
      elementalTypes: ['Flame'],
      type: 'DPS',
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    Lan: {
      id: 'Lan',
      displayName: 'Lan',
      elementalTypes: ['Flame'],
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
    },
    Lin: {
      id: 'Lin',
      displayName: 'Lin',
      elementalTypes: ['Altered'],
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
    },
    'Ling Han': {
      id: 'Ling Han',
      displayName: 'Ling Han',
      elementalTypes: ['Frost'],
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
    },
    'Liu Huo': {
      id: 'Liu Huo',
      displayName: 'Liu Huo',
      elementalTypes: ['Flame'],
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
    },
    Lyra: {
      id: 'Lyra',
      displayName: 'Lyra',
      elementalTypes: ['Physical'],
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
    },
    Meryl: {
      id: 'Meryl',
      displayName: 'Meryl',
      elementalTypes: ['Frost'],
      type: 'Defense',
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    'Ming Jing': {
      id: 'Ming Jing',
      displayName: 'Ming Jing (Zeke)',
      elementalTypes: ['Physical', 'Flame'],
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
    },
    'Nan Yin': {
      id: 'Nan Yin',
      displayName: 'Nan Yin',
      elementalTypes: ['Altered'],
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
    },
    Nemesis: {
      id: 'Nemesis',
      displayName: 'Nemesis',
      elementalTypes: ['Volt'],
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
    },
    Plotti: {
      id: 'Plotti',
      displayName: 'Plotti',
      elementalTypes: ['Flame', 'Physical'],
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
    },
    Rubilia: {
      id: 'Rubilia',
      displayName: 'Rubilia',
      elementalTypes: ['Volt'],
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
    },
    Ruby: {
      id: 'Ruby',
      displayName: 'Ruby',
      elementalTypes: ['Flame'],
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
    },
    'Saki Fuwa': {
      id: 'Saki Fuwa',
      displayName: 'Saki Fuwa',
      elementalTypes: ['Frost'],
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
    },
    Samir: {
      id: 'Samir',
      displayName: 'Samir',
      elementalTypes: ['Volt'],
      type: 'DPS',
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    Shiro: {
      id: 'Shiro',
      displayName: 'Shiro',
      elementalTypes: ['Physical'],
      type: 'DPS',
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    'Tian Lang': {
      id: 'Tian Lang',
      displayName: 'Tian Lang',
      elementalTypes: ['Volt'],
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
    },
    Tsubasa: {
      id: 'Tsubasa',
      displayName: 'Tsubasa',
      elementalTypes: ['Frost'],
      type: 'DPS',
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    Umi: {
      id: 'Umi',
      displayName: 'Umi',
      elementalTypes: ['Physical'],
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
    },
    'Yan Miao': {
      id: 'Yan Miao',
      displayName: 'Yan Miao',
      elementalTypes: ['Physical', 'Flame'],
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
    },
    Yanuo: {
      id: 'Yanuo',
      displayName: 'Yanuo',
      elementalTypes: ['Frost', 'Volt'],
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
    },
    'Yu Lan': {
      id: 'Yu Lan',
      displayName: 'Yu Lan',
      elementalTypes: ['Frost'],
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
    },
    Zero: {
      id: 'Zero',
      displayName: 'Zero',
      elementalTypes: ['Flame'],
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
    },
  },
};

export type WeaponType = 'DPS' | 'Support' | 'Defense';
