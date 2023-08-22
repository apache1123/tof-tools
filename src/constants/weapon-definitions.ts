import type { Data } from '../models/data';
import { ElementalResonance } from '../models/elemental-resonance';
import { ElementalType } from '../models/elemental-type';
import type { WeaponDefinition } from '../models/weapon-definition';
import { WeaponType } from '../models/weapon-definition';
import { WeaponResonance } from '../models/weapon-resonance';

export enum WeaponName {
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
  Shiro = 'Shiro',
  TianLang = 'Tian Lang',
  Tsubasa = 'Tsubasa',
  Umi = 'Umi',
  YuLan = 'Yu Lan',
  Zero = 'Zero',
}

export const weaponDefinitions: Data<WeaponName, WeaponDefinition> = {
  allIds: [
    WeaponName.Alyss,
    WeaponName.Annabella,
    WeaponName.Claudia,
    WeaponName.CobaltB,
    WeaponName.Cocoritter,
    WeaponName.Crow,
    WeaponName.Fenrir,
    WeaponName.Fiona,
    WeaponName.Frigg,
    WeaponName.Gnonno,
    WeaponName.Huma,
    WeaponName.Icarus,
    WeaponName.King,
    WeaponName.Lan,
    WeaponName.Lin,
    WeaponName.LiuHuo,
    WeaponName.Lyra,
    WeaponName.Meryl,
    WeaponName.MingJing,
    WeaponName.Nemesis,
    WeaponName.Rubilia,
    WeaponName.Ruby,
    WeaponName.SakiFuwa,
    WeaponName.Samir,
    WeaponName.Shiro,
    WeaponName.TianLang,
    WeaponName.Tsubasa,
    WeaponName.Umi,
    WeaponName.YuLan,
    WeaponName.Zero,
  ],
  byId: {
    [WeaponName.Alyss]: {
      id: WeaponName.Alyss,
      displayName: WeaponName.Alyss,
      elementalType: ElementalType.Frost,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Frost Resonance',
          displayName: 'Frost Resonance',
          description: '+15% frost ATK when equipping 2 or more frost weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Frost],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Frost],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Annabella]: {
      id: WeaponName.Annabella,
      displayName: WeaponName.Annabella,
      elementalType: ElementalType.Flame,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Flame Resonance',
          displayName: 'Flame Resonance',
          description: '+15% flame ATK when equipping 2 or more flame weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Flame],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Flame],
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
    [WeaponName.Claudia]: {
      id: WeaponName.Claudia,
      displayName: WeaponName.Claudia,
      elementalType: ElementalType.Physical,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Physical],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Physical],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.CobaltB]: {
      id: WeaponName.CobaltB,
      displayName: WeaponName.CobaltB,
      elementalType: ElementalType.Flame,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Flame Resonance',
          displayName: 'Flame Resonance',
          description: '+15% flame ATK when equipping 2 or more flame weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Flame],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Flame],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Cocoritter]: {
      id: WeaponName.Cocoritter,
      displayName: WeaponName.Cocoritter,
      elementalType: ElementalType.Frost,
      type: WeaponType.Support,
      attackPercentBuffs: [
        {
          id: 'Frost Resonance',
          displayName: 'Frost Resonance',
          description: '+15% frost ATK when equipping 2 or more frost weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Frost],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Frost],
        },
        {
          id: 'Frost Benediction',
          displayName: 'Frost Benediction',
          description:
            "+5% entire team's frost ATK by 5% when Benediction Resonance is active",
          value: 0.05,
          elementalTypes: [ElementalType.Frost],
          canStack: true,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          weaponResonanceRequirements: [WeaponResonance.Benediction],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Crow]: {
      id: WeaponName.Crow,
      displayName: WeaponName.Crow,
      elementalType: ElementalType.Volt,
      type: WeaponType.DPS,
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    [WeaponName.Fenrir]: {
      id: WeaponName.Fenrir,
      displayName: WeaponName.Fenrir,
      elementalType: ElementalType.Volt,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Volt Resonance',
          displayName: 'Volt Resonance',
          description: '+15% volt ATK when equipping 2 or more volt weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Volt],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Volt],
        },
        {
          id: 'Elemental Balancing',
          displayName: 'Elemental Balancing',
          description:
            '+15% all ATK by equipping 3 weapons of different elements',
          value: 0.15,
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.None],
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
    [WeaponName.Fiona]: {
      id: WeaponName.Fiona,
      displayName: WeaponName.Fiona,
      elementalType: ElementalType.Altered,
      type: WeaponType.Support,
      attackPercentBuffs: [
        {
          id: 'Altered Resonance',
          displayName: 'Altered Resonance',
          description: '+20% ATK when equipping 2 or more altered weapons',
          value: 0.2,
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Altered],
        },
        {
          id: 'Fiona discharge',
          displayName: 'Fiona discharge',
          description: '+15% ATK for 30s on discharge',
          value: 0.15,
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          weaponResonanceRequirements: [
            WeaponResonance.Attack,
            WeaponResonance.Balance,
          ],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Frigg]: {
      id: WeaponName.Frigg,
      displayName: WeaponName.Frigg,
      elementalType: ElementalType.Frost,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Frost Resonance',
          displayName: 'Frost Resonance',
          description: '+15% frost ATK when equipping 2 or more frost weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Frost],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Frost],
        },
        {
          id: 'Frost Domain',
          displayName: 'Frost Domain',
          description: 'Frost Domain gives +15% frost ATK',
          value: 0.15,
          elementalTypes: [ElementalType.Frost],
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
          elementalTypes: [ElementalType.Frost],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 6,
          maxStarRequirement: 6,
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Gnonno]: {
      id: WeaponName.Gnonno,
      displayName: WeaponName.Gnonno,
      elementalType: ElementalType.Physical,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Physical],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Physical],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Huma]: {
      id: WeaponName.Huma,
      displayName: WeaponName.Huma,
      elementalType: ElementalType.Flame,
      type: WeaponType.Defense,
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    [WeaponName.Icarus]: {
      id: WeaponName.Icarus,
      displayName: WeaponName.Icarus,
      elementalType: ElementalType.Frost,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Frost Resonance',
          displayName: 'Frost Resonance',
          description: '+15% frost ATK when equipping 2 or more frost weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Frost],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Frost],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.King]: {
      id: WeaponName.King,
      displayName: WeaponName.King,
      elementalType: ElementalType.Flame,
      type: WeaponType.DPS,
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    [WeaponName.Lan]: {
      id: WeaponName.Lan,
      displayName: WeaponName.Lan,
      elementalType: ElementalType.Flame,
      type: WeaponType.Defense,
      attackPercentBuffs: [
        {
          id: 'Flame Resonance',
          displayName: 'Flame Resonance',
          description: '+15% flame ATK when equipping 2 or more flame weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Flame],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Flame],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Lin]: {
      id: WeaponName.Lin,
      displayName: WeaponName.Lin,
      elementalType: ElementalType.Altered,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Moonlight Realm',
          displayName: 'Moonlight Realm',
          description: 'Moonlight Realm gives +15% ATK for its duration',
          value: 0.15,
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
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
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
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
          elementalTypes: [ElementalType.Frost],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Frost],
        },
        {
          id: 'Balance Moonlight Realm',
          displayName: 'Balance Moonlight Realm',
          description:
            'When paired with any 2 different elemental weapons, Moonlight Realm gives +15% ATK',
          value: 0.15,
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.None],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.LiuHuo]: {
      id: WeaponName.LiuHuo,
      displayName: WeaponName.LiuHuo,
      elementalType: ElementalType.Flame,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Flame Resonance',
          displayName: 'Flame Resonance',
          description: '+15% flame ATK when equipping 2 or more flame weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Flame],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Flame],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Lyra]: {
      id: WeaponName.Lyra,
      displayName: WeaponName.Lyra,
      elementalType: ElementalType.Physical,
      type: WeaponType.Support,
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Physical],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Physical],
        },
        {
          id: 'Physical Benediction',
          displayName: 'Physical Benediction',
          description:
            "+5% entire team's physical ATK by 5% when Benediction Resonance is active",
          value: 0.05,
          elementalTypes: [ElementalType.Physical],
          canStack: true,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          weaponResonanceRequirements: [WeaponResonance.Benediction],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Meryl]: {
      id: WeaponName.Meryl,
      displayName: WeaponName.Meryl,
      elementalType: ElementalType.Frost,
      type: WeaponType.Defense,
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    [WeaponName.MingJing]: {
      id: WeaponName.MingJing,
      displayName: WeaponName.MingJing,
      elementalType: ElementalType.Physical,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Physical],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Physical],
        },
        {
          id: 'Flame Resonance',
          displayName: 'Flame Resonance',
          description: '+15% flame ATK when equipping 2 or more flame weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Flame],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Flame],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Nemesis]: {
      id: WeaponName.Nemesis,
      displayName: WeaponName.Nemesis,
      elementalType: ElementalType.Volt,
      type: WeaponType.Support,
      attackPercentBuffs: [
        {
          id: 'Volt Resonance',
          displayName: 'Volt Resonance',
          description: '+15% volt ATK when equipping 2 or more volt weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Volt],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Volt],
        },
        {
          id: 'Volt Benediction',
          displayName: 'Volt Benediction',
          description:
            "+5% entire team's volt ATK by 5% when Benediction Resonance is active",
          value: 0.05,
          elementalTypes: [ElementalType.Volt],
          canStack: true,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          weaponResonanceRequirements: [WeaponResonance.Benediction],
        },
        {
          id: 'Nemesis 5*',
          displayName: 'Nemesis 5*',
          description: '+10% ATK for having 1 electrode out',
          value: 0.1,
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
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
          elementalTypes: [
            ElementalType.Altered,
            ElementalType.Flame,
            ElementalType.Frost,
            ElementalType.Physical,
            ElementalType.Volt,
          ],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 6,
          maxStarRequirement: 6,
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Rubilia]: {
      id: WeaponName.Rubilia,
      displayName: WeaponName.Rubilia,
      elementalType: ElementalType.Volt,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Volt Resonance',
          displayName: 'Volt Resonance',
          description: '+15% volt ATK when equipping 2 or more volt weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Volt],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Volt],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Ruby]: {
      id: WeaponName.Ruby,
      displayName: WeaponName.Ruby,
      elementalType: ElementalType.Flame,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Flame Resonance',
          displayName: 'Flame Resonance',
          description: '+15% flame ATK when equipping 2 or more flame weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Flame],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Flame],
        },
        {
          id: 'Ultimate Heat',
          displayName: 'Ultimate Heat',
          description: 'Ultimate Heat gives +10% flame ATK after fully stacked',
          value: 0.1,
          elementalTypes: [ElementalType.Flame],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 0,
          maxStarRequirement: 6,
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.SakiFuwa]: {
      id: WeaponName.SakiFuwa,
      displayName: WeaponName.SakiFuwa,
      elementalType: ElementalType.Frost,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Frost Resonance',
          displayName: 'Frost Resonance',
          description: '+15% frost ATK when equipping 2 or more frost weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Frost],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Frost],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Samir]: {
      id: WeaponName.Samir,
      displayName: WeaponName.Samir,
      elementalType: ElementalType.Volt,
      type: WeaponType.DPS,
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    [WeaponName.Shiro]: {
      id: WeaponName.Shiro,
      displayName: WeaponName.Shiro,
      elementalType: ElementalType.Physical,
      type: WeaponType.DPS,
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    [WeaponName.TianLang]: {
      id: WeaponName.TianLang,
      displayName: WeaponName.TianLang,
      elementalType: ElementalType.Volt,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Volt Resonance',
          displayName: 'Volt Resonance',
          description: '+15% volt ATK when equipping 2 or more volt weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Volt],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Volt],
        },
        {
          id: 'Volt sense',
          displayName: 'Volt sense',
          description:
            '+6% volt ATK for each other volt weapons equipped. (The tool only assumes 1 other volt weapon)',
          value: 0.06,
          elementalTypes: [ElementalType.Volt],
          canStack: false,
          isActivePassively: false,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Volt],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Tsubasa]: {
      id: WeaponName.Tsubasa,
      displayName: WeaponName.Tsubasa,
      elementalType: ElementalType.Frost,
      type: WeaponType.DPS,
      attackPercentBuffs: [],
      critRateBuffs: [],
    },
    [WeaponName.Umi]: {
      id: WeaponName.Umi,
      displayName: WeaponName.Umi,
      elementalType: ElementalType.Physical,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Physical Resonance',
          displayName: 'Physical Resonance',
          description:
            '+15% physical ATK when equipping 2 or more physical weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Physical],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Physical],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.YuLan]: {
      id: WeaponName.YuLan,
      displayName: WeaponName.YuLan,
      elementalType: ElementalType.Frost,
      type: WeaponType.DPS,
      attackPercentBuffs: [
        {
          id: 'Frost Resonance',
          displayName: 'Frost Resonance',
          description: '+15% frost ATK when equipping 2 or more frost weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Frost],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Frost],
        },
      ],
      critRateBuffs: [],
    },
    [WeaponName.Zero]: {
      id: WeaponName.Zero,
      displayName: WeaponName.Zero,
      elementalType: ElementalType.Flame,
      type: WeaponType.Support,
      attackPercentBuffs: [
        {
          id: 'Flame Resonance',
          displayName: 'Flame Resonance',
          description: '+15% flame ATK when equipping 2 or more flame weapons',
          value: 0.15,
          elementalTypes: [ElementalType.Flame],
          canStack: false,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          elementalResonanceRequirements: [ElementalResonance.Flame],
        },
        {
          id: 'Flame Benediction',
          displayName: 'Flame Benediction',
          description:
            "+5% entire team's flame ATK by 5% when Benediction Resonance is active",
          value: 0.05,
          elementalTypes: [ElementalType.Flame],
          canStack: true,
          isActivePassively: true,
          minStarRequirement: 0,
          maxStarRequirement: 6,
          weaponResonanceRequirements: [WeaponResonance.Benediction],
        },
      ],
      critRateBuffs: [],
    },
  },
};
