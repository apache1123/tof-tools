import type { Data } from '../models/data';
import { ElementalType } from '../models/elemental-type';
import type { MatrixDefinition } from '../models/matrix-definition';

export enum MatrixName {
  Alyss = 'Alyss',
  Annabella = 'Annabella',
  Claudia = 'Claudia',
  CobaltB = 'Cobalt-B',
  Cocoritter = 'Cocoritter',
  Crow = 'Crow',
  Fenrir = 'Fenrir',
  Fiona = 'Fiona',
  Frigg = 'Frigg',
  Gnonno = 'Gnonno',
  Haboela = 'Haboela',
  Huma = 'Huma',
  Icarus = 'Icarus',
  King = 'King',
  Lan = 'Lan',
  Lin = 'Lin',
  LiuHuo = 'Liu Huo',
  Lyra = 'Lyra',
  Meryl = 'Meryl',
  MingJing = 'Ming Jing',
  Nemesis = 'Nemesis',
  Rubilia = 'Rubilia',
  Ruby = 'Ruby',
  SakiFuwa = 'Saki Fuwa',
  Samir = 'Samir',
  Scylla = 'Scylla',
  Shiro = 'Shiro',
  TianLang = 'Tian Lang',
  Tsubasa = 'Tsubasa',
  Umi = 'Umi',
  YuLan = 'Yu Lan',
  Zero = 'Zero',
}

export const matrix2pcDefinitions: Data<MatrixName, MatrixDefinition> = {
  allIds: [
    MatrixName.Alyss,
    MatrixName.Annabella,
    MatrixName.Claudia,
    MatrixName.CobaltB,
    MatrixName.Cocoritter,
    MatrixName.Crow,
    MatrixName.Fenrir,
    MatrixName.Fiona,
    MatrixName.Frigg,
    MatrixName.Gnonno,
    MatrixName.Haboela,
    MatrixName.Huma,
    MatrixName.Icarus,
    MatrixName.King,
    MatrixName.Lan,
    MatrixName.Lin,
    MatrixName.LiuHuo,
    MatrixName.Lyra,
    MatrixName.Meryl,
    MatrixName.MingJing,
    MatrixName.Nemesis,
    MatrixName.Rubilia,
    MatrixName.Ruby,
    MatrixName.SakiFuwa,
    MatrixName.Samir,
    MatrixName.Scylla,
    MatrixName.Shiro,
    MatrixName.TianLang,
    MatrixName.Tsubasa,
    MatrixName.Umi,
    MatrixName.YuLan,
    MatrixName.Zero,
  ],
  byId: {
    [MatrixName.Alyss]: {
      id: MatrixName.Alyss,
      displayName: MatrixName.Alyss,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Annabella]: {
      id: MatrixName.Annabella,
      displayName: MatrixName.Annabella,
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
          isActivePassively: true,
        },
      ],
      critDamageBuffs: [],
    },
    [MatrixName.Claudia]: {
      id: MatrixName.Claudia,
      displayName: MatrixName.Claudia,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.CobaltB]: {
      id: MatrixName.CobaltB,
      displayName: MatrixName.CobaltB,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Cocoritter]: {
      id: MatrixName.Cocoritter,
      displayName: MatrixName.Cocoritter,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Crow]: {
      id: MatrixName.Crow,
      displayName: MatrixName.Crow,
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
          isActivePassively: false,
        },
      ],
    },
    [MatrixName.Fenrir]: {
      id: MatrixName.Fenrir,
      displayName: MatrixName.Fenrir,
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
          isActivePassively: true,
        },
      ],
    },
    [MatrixName.Fiona]: {
      id: MatrixName.Fiona,
      displayName: MatrixName.Fiona,
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
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
          isActivePassively: false,
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Frigg]: {
      id: MatrixName.Frigg,
      displayName: MatrixName.Frigg,
      pieces: 2,
      attackPercentBuffs: [
        {
          description:
            'Increase frost ATK when switching between frost weapons',
          starValues: [
            { star: 0, value: 0.08 },
            { star: 1, value: 0.1 },
            { star: 2, value: 0.12 },
            { star: 3, value: 0.15 },
          ],
          elementalTypes: [ElementalType.Frost],
          isActivePassively: false,
          elementalWeaponsRequirements: [
            { weaponElementalType: ElementalType.Frost, minNumOfWeapons: 2 },
          ],
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Gnonno]: {
      id: MatrixName.Gnonno,
      displayName: MatrixName.Gnonno,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Haboela]: {
      id: MatrixName.Haboela,
      displayName: MatrixName.Haboela,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Huma]: {
      id: MatrixName.Huma,
      displayName: MatrixName.Huma,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Icarus]: {
      id: MatrixName.Icarus,
      displayName: MatrixName.Icarus,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.King]: {
      id: MatrixName.King,
      displayName: MatrixName.King,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Lan]: {
      id: MatrixName.Lan,
      displayName: MatrixName.Lan,
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
          elementalTypes: [ElementalType.Flame],
          isActivePassively: true,
          elementalWeaponsRequirements: [
            { weaponElementalType: ElementalType.Flame, minNumOfWeapons: 1 },
          ],
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Lin]: {
      id: MatrixName.Lin,
      displayName: MatrixName.Lin,
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
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
          isActivePassively: false,
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.LiuHuo]: {
      id: MatrixName.LiuHuo,
      displayName: MatrixName.LiuHuo,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Lyra]: {
      id: MatrixName.Lyra,
      displayName: MatrixName.Lyra,
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
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
          isActivePassively: true,
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Meryl]: {
      id: MatrixName.Meryl,
      displayName: MatrixName.Meryl,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.MingJing]: {
      id: MatrixName.MingJing,
      displayName: MatrixName.MingJing,
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
          elementalTypes: [ElementalType.Flame, ElementalType.Physical],
          isActivePassively: true,
          elementalWeaponsRequirements: [
            { weaponElementalType: ElementalType.Flame, minNumOfWeapons: 1 },
            { weaponElementalType: ElementalType.Physical, minNumOfWeapons: 1 },
          ],
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Nemesis]: {
      id: MatrixName.Nemesis,
      displayName: MatrixName.Nemesis,
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
          elementalTypes: [ElementalType.Volt],
          isActivePassively: false,
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Rubilia]: {
      id: MatrixName.Rubilia,
      displayName: MatrixName.Rubilia,
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
          elementalTypes: [ElementalType.Volt],
          isActivePassively: true,
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Ruby]: {
      id: MatrixName.Ruby,
      displayName: MatrixName.Ruby,
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
          elementalTypes: [ElementalType.Flame],
          isActivePassively: false,
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.SakiFuwa]: {
      id: MatrixName.SakiFuwa,
      displayName: MatrixName.SakiFuwa,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Samir]: {
      id: MatrixName.Samir,
      displayName: MatrixName.Samir,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Scylla]: {
      id: MatrixName.Scylla,
      displayName: MatrixName.Scylla,
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
          isActivePassively: true,
        },
      ],
    },
    [MatrixName.Shiro]: {
      id: MatrixName.Shiro,
      displayName: MatrixName.Shiro,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.TianLang]: {
      id: MatrixName.TianLang,
      displayName: MatrixName.TianLang,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Tsubasa]: {
      id: MatrixName.Tsubasa,
      displayName: MatrixName.Tsubasa,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Umi]: {
      id: MatrixName.Umi,
      displayName: MatrixName.Umi,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.YuLan]: {
      id: MatrixName.YuLan,
      displayName: MatrixName.YuLan,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Zero]: {
      id: MatrixName.Zero,
      displayName: MatrixName.Zero,
      pieces: 2,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
  },
};

export const matrix4pcDefinitions: Data<MatrixName, MatrixDefinition> = {
  allIds: [
    MatrixName.Alyss,
    MatrixName.Annabella,
    MatrixName.Claudia,
    MatrixName.CobaltB,
    MatrixName.Cocoritter,
    MatrixName.Crow,
    MatrixName.Fenrir,
    MatrixName.Fiona,
    MatrixName.Frigg,
    MatrixName.Gnonno,
    MatrixName.Haboela,
    MatrixName.Huma,
    MatrixName.Icarus,
    MatrixName.King,
    MatrixName.Lan,
    MatrixName.Lin,
    MatrixName.LiuHuo,
    MatrixName.Lyra,
    MatrixName.Meryl,
    MatrixName.MingJing,
    MatrixName.Nemesis,
    MatrixName.Rubilia,
    MatrixName.Ruby,
    MatrixName.SakiFuwa,
    MatrixName.Samir,
    MatrixName.Scylla,
    MatrixName.Shiro,
    MatrixName.TianLang,
    MatrixName.Tsubasa,
    MatrixName.Umi,
    MatrixName.YuLan,
    MatrixName.Zero,
  ],
  byId: {
    [MatrixName.Alyss]: {
      id: MatrixName.Alyss,
      displayName: MatrixName.Alyss,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Annabella]: {
      id: MatrixName.Annabella,
      displayName: MatrixName.Annabella,
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
          isActivePassively: false,
          elementalWeaponsRequirements: [
            { weaponElementalType: ElementalType.Flame, minNumOfWeapons: 2 },
          ],
        },
      ],
    },
    [MatrixName.Claudia]: {
      id: MatrixName.Claudia,
      displayName: MatrixName.Claudia,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.CobaltB]: {
      id: MatrixName.CobaltB,
      displayName: MatrixName.CobaltB,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Cocoritter]: {
      id: MatrixName.Cocoritter,
      displayName: MatrixName.Cocoritter,
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
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
          isActivePassively: false,
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Crow]: {
      id: MatrixName.Crow,
      displayName: MatrixName.Crow,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Fenrir]: {
      id: MatrixName.Fenrir,
      displayName: MatrixName.Fenrir,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Fiona]: {
      id: MatrixName.Fiona,
      displayName: MatrixName.Fiona,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Frigg]: {
      id: MatrixName.Frigg,
      displayName: MatrixName.Frigg,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Gnonno]: {
      id: MatrixName.Gnonno,
      displayName: MatrixName.Gnonno,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Haboela]: {
      id: MatrixName.Haboela,
      displayName: MatrixName.Haboela,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Huma]: {
      id: MatrixName.Huma,
      displayName: MatrixName.Huma,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Icarus]: {
      id: MatrixName.Icarus,
      displayName: MatrixName.Icarus,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.King]: {
      id: MatrixName.King,
      displayName: MatrixName.King,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Lan]: {
      id: MatrixName.Lan,
      displayName: MatrixName.Lan,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Lin]: {
      id: MatrixName.Lin,
      displayName: MatrixName.Lin,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.LiuHuo]: {
      id: MatrixName.LiuHuo,
      displayName: MatrixName.LiuHuo,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Lyra]: {
      id: MatrixName.Lyra,
      displayName: MatrixName.Lyra,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Meryl]: {
      id: MatrixName.Meryl,
      displayName: MatrixName.Meryl,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.MingJing]: {
      id: MatrixName.MingJing,
      displayName: MatrixName.MingJing,
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
          elementalTypes: [ElementalType.Physical, ElementalType.Flame],
          isActivePassively: false,
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Nemesis]: {
      id: MatrixName.Nemesis,
      displayName: MatrixName.Nemesis,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Rubilia]: {
      id: MatrixName.Rubilia,
      displayName: MatrixName.Rubilia,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Ruby]: {
      id: MatrixName.Ruby,
      displayName: MatrixName.Ruby,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.SakiFuwa]: {
      id: MatrixName.SakiFuwa,
      displayName: MatrixName.SakiFuwa,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Samir]: {
      id: MatrixName.Samir,
      displayName: MatrixName.Samir,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Scylla]: {
      id: MatrixName.Scylla,
      displayName: MatrixName.Scylla,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Shiro]: {
      id: MatrixName.Shiro,
      displayName: MatrixName.Shiro,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.TianLang]: {
      id: MatrixName.TianLang,
      displayName: MatrixName.TianLang,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Tsubasa]: {
      id: MatrixName.Tsubasa,
      displayName: MatrixName.Tsubasa,
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
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
          isActivePassively: false,
        },
      ],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Umi]: {
      id: MatrixName.Umi,
      displayName: MatrixName.Umi,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.YuLan]: {
      id: MatrixName.YuLan,
      displayName: MatrixName.YuLan,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
    [MatrixName.Zero]: {
      id: MatrixName.Zero,
      displayName: MatrixName.Zero,
      pieces: 4,
      attackPercentBuffs: [],
      critRateBuffs: [],
      critDamageBuffs: [],
    },
  },
};
