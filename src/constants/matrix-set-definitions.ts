import type { DataAllIds, DataById } from '../models/data';
import type {
  MatrixSet2pcName,
  MatrixSet4pcName,
  MatrixSetDefinition,
} from '../models/matrix-set-definition';

export const matrixSet2pcLabel = '2pc';
export const matrixSet4pcLabel = '4pc';

export type MatrixSetBaseName =
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
  | 'Haboela'
  | 'Huang (Mimi)'
  | 'Huma'
  | 'Icarus'
  | 'Ji Yu'
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
  | 'Scylla'
  | 'Shiro'
  | 'Tian Lang'
  | 'Tsubasa'
  | 'Umi'
  | 'Yan Miao'
  | 'Yanuo'
  | 'Yu Lan'
  | 'Zero';

export const matrixSet2pcOrder: DataAllIds<MatrixSet2pcName> = [
  'Alyss 2pc',
  'Annabella 2pc',
  'Asuka 2pc',
  'Brevey 2pc',
  'Claudia 2pc',
  'Cobalt-B 2pc',
  'Cocoritter 2pc',
  'Crow 2pc',
  'Fei Se 2pc',
  'Fenrir 2pc',
  'Fiona 2pc',
  'Frigg 2pc',
  'Gnonno 2pc',
  'Haboela 2pc',
  'Huang (Mimi) 2pc',
  'Huma 2pc',
  'Icarus 2pc',
  'Ji Yu 2pc',
  'King 2pc',
  'Lan 2pc',
  'Lin 2pc',
  'Ling Han 2pc',
  'Liu Huo 2pc',
  'Lyra 2pc',
  'Meryl 2pc',
  'Ming Jing 2pc',
  'Nan Yin 2pc',
  'Nemesis 2pc',
  'Plotti 2pc',
  'Rei 2pc',
  'Rubilia 2pc',
  'Ruby 2pc',
  'Saki Fuwa 2pc',
  'Samir 2pc',
  'Scylla 2pc',
  'Shiro 2pc',
  'Tian Lang 2pc',
  'Tsubasa 2pc',
  'Umi 2pc',
  'Yan Miao 2pc',
  'Yanuo 2pc',
  'Yu Lan 2pc',
  'Zero 2pc',
];

export const matrixSet4pcOrder: DataAllIds<MatrixSet4pcName> = [
  'Alyss 4pc',
  'Annabella 4pc',
  'Asuka 4pc',
  'Brevey 4pc',
  'Claudia 4pc',
  'Cobalt-B 4pc',
  'Cocoritter 4pc',
  'Crow 4pc',
  'Fei Se 4pc',
  'Fenrir 4pc',
  'Fiona 4pc',
  'Frigg 4pc',
  'Gnonno 4pc',
  'Haboela 4pc',
  'Huang (Mimi) 4pc',
  'Huma 4pc',
  'Icarus 4pc',
  'Ji Yu 4pc',
  'King 4pc',
  'Lan 4pc',
  'Lin 4pc',
  'Ling Han 4pc',
  'Liu Huo 4pc',
  'Lyra 4pc',
  'Meryl 4pc',
  'Ming Jing 4pc',
  'Nan Yin 4pc',
  'Nemesis 4pc',
  'Plotti 4pc',
  'Rei 4pc',
  'Rubilia 4pc',
  'Ruby 4pc',
  'Saki Fuwa 4pc',
  'Samir 4pc',
  'Scylla 4pc',
  'Shiro 4pc',
  'Tian Lang 4pc',
  'Tsubasa 4pc',
  'Umi 4pc',
  'Yan Miao 4pc',
  'Yanuo 4pc',
  'Yu Lan 4pc',
  'Zero 4pc',
];

export const matrixSetDefinitionsLookup: DataById<
  MatrixSet2pcName | MatrixSet4pcName,
  MatrixSetDefinition
> = {
  'Alyss 2pc': {
    id: 'Alyss 2pc',
    displayName: 'Alyss 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Annabella 2pc': {
    id: 'Annabella 2pc',
    displayName: 'Annabella 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [
      {
        description: 'Increase crit rate after hitting with a flame weapon',
        starValues: [
          { star: 0, value: 0.04 },
          { star: 1, value: 0.04 },
          { star: 2, value: 0.048 },
          { star: 3, value: 0.048 },
        ],
        canStack: false,
        isActivePassively: false,
      },
    ],
    critDamageBuffs: [],
  },
  'Asuka 2pc': {
    id: 'Asuka 2pc',
    displayName: 'Asuka 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase physical and flame ATK, works off-hand',
        starValues: [
          { star: 0, value: 0.2 },
          { star: 1, value: 0.22 },
          { star: 2, value: 0.24 },
          { star: 3, value: 0.26 },
        ],
        elementalTypes: ['Flame', 'Physical'],
        canStack: false,
        isActivePassively: true,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Brevey 2pc': {
    id: 'Brevey 2pc',
    displayName: 'Brevey 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Claudia 2pc': {
    id: 'Claudia 2pc',
    displayName: 'Claudia 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Cobalt-B 2pc': {
    id: 'Cobalt-B 2pc',
    displayName: 'Cobalt-B 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Cocoritter 2pc': {
    id: 'Cocoritter 2pc',
    displayName: 'Cocoritter 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Crow 2pc': {
    id: 'Crow 2pc',
    displayName: 'Crow 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [
      {
        description: 'Increase crit DMG to targets under 60% HP',
        starValues: [
          { star: 0, value: 0.144 },
          { star: 1, value: 0.18 },
          { star: 2, value: 0.216 },
          { star: 3, value: 0.252 },
        ],
        canStack: false,
        isActivePassively: false,
      },
    ],
  },
  'Fei Se 2pc': {
    id: 'Fei Se 2pc',
    displayName: 'Fei Se 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description:
          'Increase ATK after using a flame skill or discharge for 30s, works off hand.',
        starValues: [
          { star: 0, value: 0.14 },
          { star: 1, value: 0.16 },
          { star: 2, value: 0.18 },
          { star: 3, value: 0.2 },
        ],
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        canStack: false,
        isActivePassively: false,
        elementalWeaponsRequirements: [
          {
            weaponElementalType: 'Flame',
            minNumOfWeapons: 1,
          },
        ],
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Fenrir 2pc': {
    id: 'Fenrir 2pc',
    displayName: 'Fenrir 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [
      {
        description: 'Increases crit DMG, works off-hand',
        starValues: [
          { star: 0, value: 0.14 },
          { star: 1, value: 0.15 },
          { star: 2, value: 0.16 },
          { star: 3, value: 0.18 },
        ],
        canStack: false,
        isActivePassively: true,
      },
    ],
  },
  'Fiona 2pc': {
    id: 'Fiona 2pc',
    displayName: 'Fiona 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase ATK after dealing damage, works off-hand',
        starValues: [
          { star: 0, value: 0.16 },
          { star: 1, value: 0.18 },
          { star: 2, value: 0.2 },
          { star: 3, value: 0.22 },
        ],
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        canStack: false,
        isActivePassively: false,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Frigg 2pc': {
    id: 'Frigg 2pc',
    displayName: 'Frigg 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase frost ATK when switching between frost weapons',
        starValues: [
          { star: 0, value: 0.08 },
          { star: 1, value: 0.1 },
          { star: 2, value: 0.12 },
          { star: 3, value: 0.15 },
        ],
        elementalTypes: ['Frost'],
        canStack: false,
        isActivePassively: false,
        elementalWeaponsRequirements: [
          { weaponElementalType: 'Frost', minNumOfWeapons: 2 },
        ],
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Gnonno 2pc': {
    id: 'Gnonno 2pc',
    displayName: 'Gnonno 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Haboela 2pc': {
    id: 'Haboela 2pc',
    displayName: 'Haboela 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Huang (Mimi) 2pc': {
    id: 'Huang (Mimi) 2pc',
    displayName: 'Huang (Mimi) 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Huma 2pc': {
    id: 'Huma 2pc',
    displayName: 'Huma 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Icarus 2pc': {
    id: 'Icarus 2pc',
    displayName: 'Icarus 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Ji Yu 2pc': {
    id: 'Ji Yu 2pc',
    displayName: 'Ji Yu 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase flame ATK, works off-hand',
        starValues: [
          { star: 0, value: 0.2 },
          { star: 1, value: 0.22 },
          { star: 2, value: 0.24 },
          { star: 3, value: 0.26 },
        ],
        elementalTypes: ['Flame'],
        canStack: false,
        isActivePassively: true,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'King 2pc': {
    id: 'King 2pc',
    displayName: 'King 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Lan 2pc': {
    id: 'Lan 2pc',
    displayName: 'Lan 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description:
          'Equip at least 1 flame weapon increases flame ATK, works off-hand',
        starValues: [
          { star: 0, value: 0.06 },
          { star: 1, value: 0.07 },
          { star: 2, value: 0.08 },
          { star: 3, value: 0.09 },
        ],
        elementalTypes: ['Flame'],
        canStack: false,
        isActivePassively: true,
        elementalWeaponsRequirements: [
          { weaponElementalType: 'Flame', minNumOfWeapons: 1 },
        ],
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Lin 2pc': {
    id: 'Lin 2pc',
    displayName: 'Lin 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase ATK on hit, very small ramp-up',
        starValues: [
          { star: 0, value: 0.105 },
          { star: 1, value: 0.13 },
          { star: 2, value: 0.155 },
          { star: 3, value: 0.18 },
        ],
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        canStack: false,
        isActivePassively: false,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Ling Han 2pc': {
    id: 'Ling Han 2pc',
    displayName: 'Ling Han 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Liu Huo 2pc': {
    id: 'Liu Huo 2pc',
    displayName: 'Liu Huo 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Lyra 2pc': {
    id: 'Lyra 2pc',
    displayName: 'Lyra 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase ATK on equipped weapon',
        starValues: [
          { star: 0, value: 0.13 },
          { star: 1, value: 0.17 },
          { star: 2, value: 0.21 },
          { star: 3, value: 0.25 },
        ],
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        canStack: false,
        isActivePassively: true,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Meryl 2pc': {
    id: 'Meryl 2pc',
    displayName: 'Meryl 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Ming Jing 2pc': {
    id: 'Ming Jing 2pc',
    displayName: 'Ming Jing 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description:
          'Increase physical ATK and flame ATK when at least 1 physical or flame weapon is equipped, works off-hand',
        starValues: [
          { star: 0, value: 0.14 },
          { star: 1, value: 0.16 },
          { star: 2, value: 0.18 },
          { star: 3, value: 0.2 },
        ],
        elementalTypes: ['Flame', 'Physical'],
        canStack: false,
        isActivePassively: true,
        elementalWeaponsRequirements: [
          { weaponElementalType: 'Flame', minNumOfWeapons: 1 },
          { weaponElementalType: 'Physical', minNumOfWeapons: 1 },
        ],
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Nan Yin 2pc': {
    id: 'Nan Yin 2pc',
    displayName: 'Nan Yin 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase all ATK, works off-hand',
        starValues: [
          { star: 0, value: 0.19 },
          { star: 1, value: 0.21 },
          { star: 2, value: 0.23 },
          { star: 3, value: 0.25 },
        ],
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        canStack: false,
        isActivePassively: true,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Nemesis 2pc': {
    id: 'Nemesis 2pc',
    displayName: 'Nemesis 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description:
          'Whilst being healed, increase volt attack. Can be applied to/by party members',
        starValues: [
          { star: 0, value: 0.08 },
          { star: 1, value: 0.1 },
          { star: 2, value: 0.12 },
          { star: 3, value: 0.15 },
        ],
        elementalTypes: ['Volt'],
        canStack: false,
        isActivePassively: false,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Plotti 2pc': {
    id: 'Plotti 2pc',
    displayName: 'Plotti 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase flame and physical ATK, works off-hand',
        starValues: [
          { star: 0, value: 0.19 },
          { star: 1, value: 0.21 },
          { star: 2, value: 0.23 },
          { star: 3, value: 0.25 },
        ],
        elementalTypes: ['Flame', 'Physical'],
        canStack: false,
        isActivePassively: true,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Rei 2pc': {
    id: 'Rei 2pc',
    displayName: 'Rei 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Rubilia 2pc': {
    id: 'Rubilia 2pc',
    displayName: 'Rubilia 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increases volt attack only, works off-hand',
        starValues: [
          { star: 0, value: 0.145 },
          { star: 1, value: 0.165 },
          { star: 2, value: 0.185 },
          { star: 3, value: 0.205 },
        ],
        elementalTypes: ['Volt'],
        canStack: false,
        isActivePassively: true,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Ruby 2pc': {
    id: 'Ruby 2pc',
    displayName: 'Ruby 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase flame ATK after casting skill',
        starValues: [
          { star: 0, value: 0.08 },
          { star: 1, value: 0.1 },
          { star: 2, value: 0.12 },
          { star: 3, value: 0.15 },
        ],
        elementalTypes: ['Flame'],
        canStack: false,
        isActivePassively: false,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Saki Fuwa 2pc': {
    id: 'Saki Fuwa 2pc',
    displayName: 'Saki Fuwa 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Samir 2pc': {
    id: 'Samir 2pc',
    displayName: 'Samir 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Scylla 2pc': {
    id: 'Scylla 2pc',
    displayName: 'Scylla 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [
      {
        description: 'Increases crit DMG for the equipped weapon',
        starValues: [
          { star: 0, value: 0.13 },
          { star: 1, value: 0.16 },
          { star: 2, value: 0.19 },
          { star: 3, value: 0.23 },
        ],
        canStack: false,
        isActivePassively: true,
      },
    ],
  },
  'Shiro 2pc': {
    id: 'Shiro 2pc',
    displayName: 'Shiro 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Tian Lang 2pc': {
    id: 'Tian Lang 2pc',
    displayName: 'Tian Lang 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Tsubasa 2pc': {
    id: 'Tsubasa 2pc',
    displayName: 'Tsubasa 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Umi 2pc': {
    id: 'Umi 2pc',
    displayName: 'Umi 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Yan Miao 2pc': {
    id: 'Yan Miao 2pc',
    displayName: 'Yan Miao 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase physical and flame ATK, works off-hand',
        starValues: [
          { star: 0, value: 0.19 },
          { star: 1, value: 0.21 },
          { star: 2, value: 0.23 },
          { star: 3, value: 0.25 },
        ],
        elementalTypes: ['Flame', 'Physical'],
        canStack: false,
        isActivePassively: true,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Yanuo 2pc': {
    id: 'Yanuo 2pc',
    displayName: 'Yanuo 2pc',
    pieces: 2,
    attackPercentBuffs: [
      {
        description: 'Increase frost and volt ATK, works off-hand',
        starValues: [
          { star: 0, value: 0.05 },
          { star: 1, value: 0.05 },
          { star: 2, value: 0.05 },
          { star: 3, value: 0.05 },
        ],
        elementalTypes: ['Frost', 'Volt'],
        canStack: false,
        isActivePassively: true,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Yu Lan 2pc': {
    id: 'Yu Lan 2pc',
    displayName: 'Yu Lan 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Zero 2pc': {
    id: 'Zero 2pc',
    displayName: 'Zero 2pc',
    pieces: 2,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Alyss 4pc': {
    id: 'Alyss 4pc',
    displayName: 'Alyss 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Annabella 4pc': {
    id: 'Annabella 4pc',
    displayName: 'Annabella 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [
      {
        description:
          'When equipping 2 or more flame weapons, increases crit DMG after landing a crit,',
        starValues: [
          { star: 0, value: 0.12 },
          { star: 1, value: 0.14 },
          { star: 2, value: 0.16 },
          { star: 3, value: 0.18 },
        ],
        canStack: false,
        isActivePassively: false,
        elementalWeaponsRequirements: [
          { weaponElementalType: 'Flame', minNumOfWeapons: 2 },
        ],
      },
    ],
  },
  'Asuka 4pc': {
    id: 'Asuka 4pc',
    displayName: 'Asuka 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Brevey 4pc': {
    id: 'Brevey 4pc',
    displayName: 'Brevey 4pc',
    pieces: 4,
    attackPercentBuffs: [
      {
        description:
          'When benediction resonance is not active, increase all ATK',
        starValues: [
          { star: 0, value: 0.26 },
          { star: 1, value: 0.3 },
          { star: 2, value: 0.34 },
          { star: 3, value: 0.38 },
        ],
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        canStack: false,
        isActivePassively: true,
        weaponResonanceRequirements: ['Attack', 'Balance', 'Fortitude'],
      },
      {
        description: 'When benediction resonance is active, increase all ATK',
        starValues: [
          { star: 0, value: 0.14 },
          { star: 1, value: 0.16 },
          { star: 2, value: 0.18 },
          { star: 3, value: 0.2 },
        ],
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        canStack: false,
        isActivePassively: true,
        weaponResonanceRequirements: ['Benediction'],
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Claudia 4pc': {
    id: 'Claudia 4pc',
    displayName: 'Claudia 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Cobalt-B 4pc': {
    id: 'Cobalt-B 4pc',
    displayName: 'Cobalt-B 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Cocoritter 4pc': {
    id: 'Cocoritter 4pc',
    displayName: 'Cocoritter 4pc',
    pieces: 4,
    attackPercentBuffs: [
      {
        description:
          'When you or your teammates are healed, increase ATK for 6 seconds',
        starValues: [
          { star: 0, value: 0.125 },
          { star: 1, value: 0.15 },
          { star: 2, value: 0.175 },
          { star: 3, value: 0.2 },
        ],
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        canStack: false,
        isActivePassively: false,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Crow 4pc': {
    id: 'Crow 4pc',
    displayName: 'Crow 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Fei Se 4pc': {
    id: 'Fei Se 4pc',
    displayName: 'Fei Se 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Fenrir 4pc': {
    id: 'Fenrir 4pc',
    displayName: 'Fenrir 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Fiona 4pc': {
    id: 'Fiona 4pc',
    displayName: 'Fiona 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Frigg 4pc': {
    id: 'Frigg 4pc',
    displayName: 'Frigg 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Gnonno 4pc': {
    id: 'Gnonno 4pc',
    displayName: 'Gnonno 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Haboela 4pc': {
    id: 'Haboela 4pc',
    displayName: 'Haboela 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Huang (Mimi) 4pc': {
    id: 'Huang (Mimi) 4pc',
    displayName: 'Huang (Mimi) 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [
      {
        description:
          'After using Azure Moon/Soaring Dragon, increase crit DMG for 30 seconds. Works off-hand.',
        starValues: [
          { star: 0, value: 0.06 },
          { star: 1, value: 0.06 },
          { star: 2, value: 0.06 },
          { star: 3, value: 0.06 },
        ],
        canStack: false,
        isActivePassively: false,
      },
    ],
  },
  'Huma 4pc': {
    id: 'Huma 4pc',
    displayName: 'Huma 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Icarus 4pc': {
    id: 'Icarus 4pc',
    displayName: 'Icarus 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Ji Yu 4pc': {
    id: 'Ji Yu 4pc',
    displayName: 'Ji Yu 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [
      {
        description:
          'When Freeflow is equipped, increase crit damage by 10%, works off-hand',
        starValues: [
          { star: 0, value: 0.1 },
          { star: 1, value: 0.1 },
          { star: 2, value: 0.1 },
          { star: 3, value: 0.1 },
        ],
        canStack: false,
        isActivePassively: true,
        weaponRequirement: 'Ji Yu',
      },
    ],
  },
  'King 4pc': {
    id: 'King 4pc',
    displayName: 'King 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Lan 4pc': {
    id: 'Lan 4pc',
    displayName: 'Lan 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Lin 4pc': {
    id: 'Lin 4pc',
    displayName: 'Lin 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Ling Han 4pc': {
    id: 'Ling Han 4pc',
    displayName: 'Ling Han 4pc',
    pieces: 4,
    attackPercentBuffs: [
      {
        description:
          "Increase all ATK when Ling Han's weapon is equipped, works off-hand",
        starValues: [
          { star: 0, value: 0.12 },
          { star: 1, value: 0.12 },
          { star: 2, value: 0.12 },
          { star: 3, value: 0.12 },
        ],
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        canStack: false,
        isActivePassively: true,
        weaponRequirement: 'Ling Han',
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Liu Huo 4pc': {
    id: 'Liu Huo 4pc',
    displayName: 'Liu Huo 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Lyra 4pc': {
    id: 'Lyra 4pc',
    displayName: 'Lyra 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Meryl 4pc': {
    id: 'Meryl 4pc',
    displayName: 'Meryl 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Ming Jing 4pc': {
    id: 'Ming Jing 4pc',
    displayName: 'Ming Jing 4pc',
    pieces: 4,
    attackPercentBuffs: [
      {
        description:
          'Increase physical ATK and flame ATK for 30 seconds after applying snake bite, works off-hand',
        starValues: [
          { star: 0, value: 0.09 },
          { star: 1, value: 0.09 },
          { star: 2, value: 0.09 },
          { star: 3, value: 0.09 },
        ],
        elementalTypes: ['Physical', 'Flame'],
        canStack: false,
        isActivePassively: false,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Nan Yin 4pc': {
    id: 'Nan Yin 4pc',
    displayName: 'Nan Yin 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [
      {
        description:
          "Increase crit damage when Nan Yin's weapon is equipped, works off-hand",
        starValues: [
          { star: 0, value: 0.08 },
          { star: 1, value: 0.08 },
          { star: 2, value: 0.08 },
          { star: 3, value: 0.08 },
        ],
        canStack: false,
        isActivePassively: true,
        weaponRequirement: 'Nan Yin',
      },
    ],
  },
  'Nemesis 4pc': {
    id: 'Nemesis 4pc',
    displayName: 'Nemesis 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Plotti 4pc': {
    id: 'Plotti 4pc',
    displayName: 'Plotti 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Rei 4pc': {
    id: 'Rei 4pc',
    displayName: 'Rei 4pc',
    pieces: 4,
    attackPercentBuffs: [
      {
        description:
          "After dealing damage with Rei's weapon, increase volt and frost ATK by 12% for 5 seconds",
        starValues: [
          { star: 0, value: 0.12 },
          { star: 1, value: 0.12 },
          { star: 2, value: 0.12 },
          { star: 3, value: 0.12 },
        ],
        elementalTypes: ['Volt', 'Frost'],
        canStack: false,
        isActivePassively: false,
        weaponRequirement: 'Rei',
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Rubilia 4pc': {
    id: 'Rubilia 4pc',
    displayName: 'Rubilia 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Ruby 4pc': {
    id: 'Ruby 4pc',
    displayName: 'Ruby 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Saki Fuwa 4pc': {
    id: 'Saki Fuwa 4pc',
    displayName: 'Saki Fuwa 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Samir 4pc': {
    id: 'Samir 4pc',
    displayName: 'Samir 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Scylla 4pc': {
    id: 'Scylla 4pc',
    displayName: 'Scylla 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Shiro 4pc': {
    id: 'Shiro 4pc',
    displayName: 'Shiro 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Tian Lang 4pc': {
    id: 'Tian Lang 4pc',
    displayName: 'Tian Lang 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Tsubasa 4pc': {
    id: 'Tsubasa 4pc',
    displayName: 'Tsubasa 4pc',
    pieces: 4,
    attackPercentBuffs: [
      {
        description:
          'Upon a headshot or hitting the target with Icewind Arrow: Piercing Shot, increase ATK for 8 seconds',
        starValues: [
          { star: 0, value: 0.15 },
          { star: 1, value: 0.18 },
          { star: 2, value: 0.21 },
          { star: 3, value: 0.25 },
        ],
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
        canStack: true,
        isActivePassively: false,
      },
    ],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Umi 4pc': {
    id: 'Umi 4pc',
    displayName: 'Umi 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Yan Miao 4pc': {
    id: 'Yan Miao 4pc',
    displayName: 'Yan Miao 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Yanuo 4pc': {
    id: 'Yanuo 4pc',
    displayName: 'Yanuo 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Yu Lan 4pc': {
    id: 'Yu Lan 4pc',
    displayName: 'Yu Lan 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
  'Zero 4pc': {
    id: 'Zero 4pc',
    displayName: 'Zero 4pc',
    pieces: 4,
    attackPercentBuffs: [],
    critRateBuffs: [],
    critDamageBuffs: [],
  },
};
