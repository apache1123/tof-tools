import type { Data } from '../models/data';
import type { SimulacrumTrait } from '../models/v4/simulacrum-trait';
import type { WeaponName } from './weapon-definitions';

export type SimulacrumName = WeaponName;

export const simulacrumTraits: Data<SimulacrumName, SimulacrumTrait> = {
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
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'alyss-trait',
          displayName: 'Alyss trait',
          description:
            'Increase final damage by 18% for 18 seconds after successfully using a weapon skill.',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            skillOfAnyWeapon: true,
          },
          duration: {
            value: 18000,
          },
          cooldown: 0,
        },
      ],
      miscellaneousBuffs: [],
    },
    Annabella: {
      id: 'Annabella',
      displayName: 'Annabella',
      attackBuffs: [],
      // TODO:
      damageBuffs: [],
      miscellaneousBuffs: [],
      remarks: 'Annabella trait not implemented yet',
    },
    Asuka: {
      id: 'Asuka',
      displayName: 'Asuka',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'asuka-trait',
          displayName: 'Asuka trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
      ],
      miscellaneousBuffs: [],
    },
    Brevey: {
      id: 'Brevey',
      displayName: 'Brevey',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'brevey-trait',
          displayName: 'Brevey trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
        {
          id: 'brevey-trait-additional',
          displayName: 'Brevey trait additional',
          description:
            'When Pactcrest ☆ Metz is equipped, increase final damage by an additional 6%.',
          value: 0.06,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            weaponInTeam: 'Brevey',
          },
        },
      ],
      miscellaneousBuffs: [],
    },
    Claudia: {
      id: 'Claudia',
      displayName: 'Claudia',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    'Cobalt-B': {
      id: 'Cobalt-B',
      displayName: 'Cobalt-B',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
      remarks: 'Cobalt-B trait will not be implemented',
    },
    Cocoritter: {
      id: 'Cocoritter',
      displayName: 'Cocoritter',
      attackBuffs: [
        {
          id: 'cocoritter-trait',
          displayName: 'Cocoritter trait',
          description:
            "Using a support-type weapon's discharge skill or weapon skill, increase nearby allies' (including self) ATK by 15% for 5 seconds.",
          value: 0.15,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          maxStacks: 1,
          triggeredBy: {
            skillOfWeaponType: 'Support',
            dischargeOfWeaponType: 'Support',
          },
          duration: {
            value: 5000,
          },
          cooldown: 0,
        },
      ],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    Crow: {
      id: 'Crow',
      displayName: 'Crow',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'crow-trait',
          displayName: 'Crow trait',
          description: 'Increase damage dealt by 10% when not in team play',
          value: 0.1,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
        // TODO: verify if this is 10+12% or 10+2%
        {
          id: 'crow-trait-combat-start',
          displayName: 'Crow trait - entering combat',
          description:
            'Increase damage dealt by 12% for 12 seconds when entering combat',
          value: 0.12,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            value: 12000,
          },
          cooldown: 0,
        },
      ],
      miscellaneousBuffs: [],
    },
    'Fei Se': {
      id: 'Fei Se',
      displayName: 'Fei Se',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'feise-trait-1-flame',
          displayName: 'Fei Se trait',
          description:
            'After using Whirling, for every flame weapon equipped, increase final damage by 9% for 30 seconds.',
          value: 0.09,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            weaponAttacks: ['feise-skill-whirling'],
          },
          duration: {
            value: 30000,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Flame',
              numOfWeapons: 1,
            },
          },
        },
        {
          id: 'feise-trait-2-flame',
          displayName: 'Fei Se trait',
          description:
            'After using Whirling, for every flame weapon equipped, increase final damage by 9% for 30 seconds.',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            weaponAttacks: ['feise-skill-whirling'],
          },
          duration: {
            value: 30000,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Flame',
              numOfWeapons: 2,
            },
          },
        },
        {
          id: 'feise-trait-3-flame',
          displayName: 'Fei Se trait',
          description:
            'After using Whirling, for every flame weapon equipped, increase final damage by 9% for 30 seconds.',
          value: 0.27,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            weaponAttacks: ['feise-skill-whirling'],
          },
          duration: {
            value: 30000,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Flame',
              numOfWeapons: 3,
            },
          },
        },
      ],
      miscellaneousBuffs: [],
    },
    Fenrir: {
      id: 'Fenrir',
      displayName: 'Fenrir',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'fenrir-trait-2-elemental-types',
          displayName: 'Fenrir trait',
          description:
            'Increase final damage by 18% when equipping 2 weapons of different elements',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            numOfDifferentElementalTypesInTeam: 2,
          },
        },
        {
          id: 'fenrir-trait-3-elemental-types',
          displayName: 'Fenrir trait',
          description:
            'Increase final damage by 23% when equipping 3 weapons of different elements',
          value: 0.23,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            numOfDifferentElementalTypesInTeam: 3,
          },
        },
      ],
      miscellaneousBuffs: [],
    },
    // TODO: Fiona skills are specifically buffed by trait
    Fiona: {
      id: 'Fiona',
      displayName: 'Fiona',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'fiona-trait',
          displayName: 'Fiona trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
      ],
      miscellaneousBuffs: [],
    },
    Frigg: {
      id: 'Frigg',
      displayName: 'Frigg',
      attackBuffs: [
        {
          id: 'frigg-trait',
          displayName: 'Frigg trait',
          description:
            'Upon entering battle, gain 2.4% frost ATK for 5 seconds every 3 seconds, with up to 10 stacks. Assume max stacks at the start for simplicity',
          value: 0.24,
          elementalTypes: ['Frost'],
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
      ],
      damageBuffs: [],
      miscellaneousBuffs: [],
      remarks:
        'For simplicity, Frigg trait is calculated as max stacks at the start of battle, so it will be stronger than it actually is',
    },
    // TODO:
    Gnonno: {
      id: 'Gnonno',
      displayName: 'Gnonno',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    // TODO: crit rate duration buff
    'Huang (Mimi)': {
      id: 'Huang (Mimi)',
      displayName: 'Huang (Mimi)',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'mimi-trait',
          displayName: 'Mimi trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
        {
          id: 'mimi-trait-triple-volt',
          displayName: 'Mimi trait - Triple volt',
          description:
            'When equipped with 3 volt weapons, increase volt damage by 6%',
          value: 0.06,
          elementalTypes: ['Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Volt',
              numOfWeapons: 3,
            },
          },
        },
      ],
      miscellaneousBuffs: [],
    },
    Huma: {
      id: 'Huma',
      displayName: 'Huma',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    Icarus: {
      id: 'Icarus',
      displayName: 'Icarus',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'icarus-trait',
          displayName: 'Icarus trait',
          description:
            'After equipping Precious One, increase final damage by 15%',
          value: 0.15,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            weaponInTeam: 'Icarus',
          },
        },
      ],
      miscellaneousBuffs: [],
    },
    King: {
      id: 'King',
      displayName: 'King',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    Lan: {
      id: 'Lan',
      displayName: 'Lan',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'lan-trait',
          displayName: 'Lan trait',
          description:
            'During Fortitude resonance, final damage is increased by 8%',
          value: 0.08,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            weaponResonance: 'Fortitude',
          },
        },
      ],
      miscellaneousBuffs: [],
    },
    // TODO: lin extra skill damage
    Lin: {
      id: 'Lin',
      displayName: 'Lin',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    // TODO: 3 frost extra charge gained; deal passive attack after frost weapon skill or discharge
    'Ling Han': {
      id: 'Ling Han',
      displayName: 'Ling Han',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'linghan-trait',
          displayName: 'Ling Han trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
        {
          id: 'linghan-trait-1-frost',
          displayName: 'Ling Han trait - 1 frost weapon',
          description:
            'For every frost weapon equipped, increase frost damage by 2.5%',
          value: 0.025,
          elementalTypes: ['Frost'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Frost',
              numOfWeapons: 1,
            },
          },
        },
        {
          id: 'linghan-trait-2-frost',
          displayName: 'Ling Han trait - 2 frost weapons',
          description:
            'For every frost weapon equipped, increase frost damage by 2.5%',
          value: 0.05,
          elementalTypes: ['Frost'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Frost',
              numOfWeapons: 2,
            },
          },
        },
        {
          id: 'linghan-trait-3-frost',
          displayName: 'Ling Han trait - 3 frost weapons',
          description:
            'For every frost weapon equipped, increase frost damage by 2.5%',
          value: 0.075,
          elementalTypes: ['Frost'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Frost',
              numOfWeapons: 3,
            },
          },
        },
      ],
      miscellaneousBuffs: [],
    },
    // TODO: liu huo trait additional effects...
    'Liu Huo': {
      id: 'Liu Huo',
      displayName: 'Liu Huo',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'liuhuo-trait',
          displayName: 'Liu Huo trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
      ],
      miscellaneousBuffs: [],
    },
    Lyra: {
      id: 'Lyra',
      displayName: 'Lyra',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    Meryl: {
      id: 'Meryl',
      displayName: 'Meryl',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    'Ming Jing': {
      id: 'Ming Jing',
      displayName: 'Ming Jing (Zeke)',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'mingjing-trait',
          displayName: 'Ming Jing trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
      ],
      miscellaneousBuffs: [
        {
          id: 'mingjing-trait-physical-increase',
          displayName: 'Ming Jing trait - physical base attack increase',
          description:
            "The Wanderer's base physical ATK is increased to the highest value out of their physical/flame/frost/volt base ATK.",
          increaseElementalBaseAttackToMatchHighest: 'Physical',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
        {
          id: 'mingjing-trait-normal-attack',
          displayName: 'Ming Jing trait - normal attack increase',
          description:
            'When the main slot weapon is Onyx Tortoise, normal attack damage is increased by 50%.',
          normalAttackBuff: {
            forWeapon: 'Ming Jing',
            value: 0.5,
          },
          maxStacks: 1,
          triggeredBy: {
            activeWeapon: 'Ming Jing',
          },
          duration: {
            followActiveWeapon: true,
          },
          cooldown: 0,
        },
      ],
    },
    'Nan Yin': {
      id: 'Nan Yin',
      displayName: 'Nan Yin',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'nanyin-trait',
          displayName: 'Nan Yin trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
        {
          id: 'nanyin-trait-active-weapon-1-non-altered',
          displayName: 'Nan Yin trait - 1 non-altered weapon',
          description:
            'When Purple Bamboo is in the main slot, for every 1 non-altered weapon equipped, increase all elemental damage by 8%',
          value: 0.08,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            activeWeapon: 'Nan Yin',
          },
          duration: {
            followActiveWeapon: true,
          },
          cooldown: 0,
          requirements: {
            notElementalTypeWeaponsInTeam: {
              notElementalType: 'Altered',
              numOfWeapons: 1,
            },
          },
        },
        {
          id: 'nanyin-trait-active-weapon-2-non-altered',
          displayName: 'Nan Yin trait - 2 non-altered weapons',
          description:
            'When Purple Bamboo is in the main slot, for every 1 non-altered weapon equipped, increase all elemental damage by 8%',
          value: 0.16,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            activeWeapon: 'Nan Yin',
          },
          duration: {
            followActiveWeapon: true,
          },
          cooldown: 0,
          requirements: {
            notElementalTypeWeaponsInTeam: {
              notElementalType: 'Altered',
              numOfWeapons: 2,
            },
          },
        },
      ],
      miscellaneousBuffs: [],
    },
    // TODO: attack on electrode summon
    Nemesis: {
      id: 'Nemesis',
      displayName: 'Nemesis',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    Plotti: {
      id: 'Plotti',
      displayName: 'Plotti',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'plotti-trait',
          displayName: 'Plotti trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
      ],
      miscellaneousBuffs: [
        {
          id: 'plotti-trait-weapon-damage-buff',
          displayName: 'Plotti trait - plotti weapon buff',
          description:
            "Increase EP-7000 Skyfire EP-7000 Skyfire's flame damage by 30%",
          allAttackBuff: {
            forWeapon: 'Plotti',
            value: 0.3,
          },
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
      ],
    },
    Rubilia: {
      id: 'Rubilia',
      displayName: 'Rubilia',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'rubilia-trait-1-volt',
          displayName: 'Rubilia trait - 1 volt weapon',
          description:
            'Increase volt damage by 8% for every 1 volt weapon equipped',
          value: 0.08,
          elementalTypes: ['Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Volt',
              numOfWeapons: 1,
            },
          },
        },
        {
          id: 'rubilia-trait-2-volt',
          displayName: 'Rubilia trait - 2 volt weapons',
          description:
            'Increase volt damage by 8% for every 1 volt weapon equipped',
          value: 0.16,
          elementalTypes: ['Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Volt',
              numOfWeapons: 2,
            },
          },
        },
        {
          id: 'rubilia-trait-3-volt',
          displayName: 'Rubilia trait - 3 volt weapons',
          description:
            'Increase volt damage by 8% for every 1 volt weapon equipped',
          value: 0.24,
          elementalTypes: ['Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Volt',
              numOfWeapons: 3,
            },
          },
        },
      ],
      miscellaneousBuffs: [],
    },
    Ruby: {
      id: 'Ruby',
      displayName: 'Ruby',
      attackBuffs: [
        {
          id: 'ruby-trait-dolly-atk',
          displayName: 'Ruby trait - Dolly ATK increase',
          description:
            'Increases flame ATK after throwing Dolly by 12% for 10 seconds',
          value: 0.12,
          elementalTypes: ['Flame'],
          maxStacks: 1,
          triggeredBy: {
            weaponAttacks: ['ruby-dodge-go-dolly'],
          },
          duration: {
            value: 10000,
          },
          cooldown: 0,
        },
      ],
      damageBuffs: [
        {
          id: 'ruby-trait-dolly-dmg',
          displayName: 'Ruby trait - Dolly DMG increase',
          description:
            'Increases the flame damage received by all enemies within 5 meters of Dolly by 8%',
          value: 0.08,
          elementalTypes: ['Flame'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            weaponAttacks: ['ruby-dodge-go-dolly'],
          },
          duration: {
            value: 10000,
          },
          cooldown: 0,
          remarks: 'Assumes Dolly remains for 10 seconds and enemy is near it',
        },
      ],
      miscellaneousBuffs: [],
    },
    'Saki Fuwa': {
      id: 'Saki Fuwa',
      displayName: 'Saki Fuwa',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    Samir: {
      id: 'Samir',
      displayName: 'Samir',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'samir-trait',
          displayName: 'Samir trait',
          description:
            'Grant 1 stack of Concentration every 4 seconds when Samir receives no damage. Each stack increases damage dealt by 4%, and can stack up to 5 times.',
          value: 0.2,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          remarks:
            'For simplicity, assume max stacks at all times (+20% damage at all times)',
        },
      ],
      miscellaneousBuffs: [],
    },
    Shiro: {
      id: 'Shiro',
      displayName: 'Shiro',
      attackBuffs: [
        {
          id: 'shiro-trait-all-atk',
          displayName: 'Shiro trait - all ATK increase',
          description:
            'After using a weapon skill/discharge skill, increase all kinds of ATK by 16% and physical ATK by an additional 10% for 8 seconds. Cooldown: 16 seconds.',
          value: 0.16,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          maxStacks: 1,
          triggeredBy: {
            skillOfAnyWeapon: true,
            dischargeOfAnyWeapon: true,
          },
          duration: {
            value: 8000,
          },
          cooldown: 16000,
        },
        {
          id: 'shiro-trait-phys-atk',
          displayName: 'Shiro trait - physical ATK increase',
          description:
            'After using a weapon skill/discharge skill, increase all kinds of ATK by 16% and physical ATK by an additional 10% for 8 seconds. Cooldown: 16 seconds.',
          value: 0.1,
          elementalTypes: ['Physical'],
          maxStacks: 1,
          triggeredBy: {
            skillOfAnyWeapon: true,
            dischargeOfAnyWeapon: true,
          },
          duration: {
            value: 8000,
          },
          cooldown: 16000,
        },
      ],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    'Tian Lang': {
      id: 'Tian Lang',
      displayName: 'Tian Lang',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'tianlang-trait',
          displayName: 'Tian Lang trait',
          description:
            'When volt weapon skill and discharge skill are released simultaneously, increase volt damage by 18% for 8 seconds.',
          value: 0.18,
          elementalTypes: ['Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          // TODO: need to check if dual element weapons trigger this
          triggeredBy: {
            skillOfElementalType: 'Volt',
            dischargeOfElementalType: 'Volt',
          },
          duration: {
            value: 8000,
          },
          cooldown: 0,
          remarks:
            'Assuming the effect activates every volt weapon skill or discharge, ignoring the "simultaneously" requirement',
        },
      ],
      miscellaneousBuffs: [],
    },
    Tsubasa: {
      id: 'Tsubasa',
      displayName: 'Tsubasa',
      attackBuffs: [
        {
          id: 'tsubasa-trait',
          displayName: 'Tsubasa trait',
          description:
            'Each time Tsubasa deals damage, gain 1 stack of Fierce Strike, up to 1 stack per 1 second. Each stack adds 0.6% ATK, up to 30 stacks. Refreshes effect duration upon gaining the effect again. The effect lasts for 30 seconds.',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          remarks: 'For simplicity, assume max stacks at all times (+18% ATK)',
        },
      ],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
    Umi: {
      id: 'Umi',
      displayName: 'Umi',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'umi-trait',
          displayName: 'Umi trait',
          description:
            "Increases final damage by 18% for 30 seconds whenever Umi uses It's Magic Time",
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            weaponAttacks: ["umi-skill-it's-magic-time"],
          },
          duration: {
            value: 30000,
          },
          cooldown: 0,
        },
      ],
      miscellaneousBuffs: [],
    },
    'Yan Miao': {
      id: 'Yan Miao',
      displayName: 'Yan Miao',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'yanmiao-trait',
          displayName: 'Yan Miao trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
        {
          id: 'yanmiao-trait-weapon-buff',
          displayName: 'Yan Miao trait - Equilibrium buff',
          description:
            'When Equilibrium is equipped, increase physical damage dealt to targets with less than 80% of HP by 10%',
          value: 0.1,
          elementalTypes: ['Physical'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            applyToEndSegmentOfCombat: 0.8,
          },
          cooldown: 0,
          remarks: 'This is assumed to be active 80% of the battle duration',
        },
      ],
      miscellaneousBuffs: [
        {
          id: 'yanmiao-trait-normal-atk-buff-1-phys',
          displayName: 'Yan Miao trait - 1 physical weapon',
          description:
            'For every 1 physical weapon equipped, increase normal attack damage of Equilibrium by 20%, up to 40%.',
          normalAttackBuff: {
            forWeapon: 'Yan Miao',
            value: 0.2,
          },
          maxStacks: 1,
          triggeredBy: {
            activeWeapon: 'Yan Miao',
          },
          duration: {
            followActiveWeapon: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Physical',
              numOfWeapons: 1,
            },
          },
        },
        {
          id: 'yanmiao-trait-normal-atk-buff-2-phys',
          displayName: 'Yan Miao trait - 2 physical weapons',
          description:
            'For every 1 physical weapon equipped, increase normal attack damage of Equilibrium by 20%, up to 40%.',
          normalAttackBuff: {
            forWeapon: 'Yan Miao',
            value: 0.4,
          },
          maxStacks: 1,
          triggeredBy: {
            activeWeapon: 'Yan Miao',
          },
          duration: {
            followActiveWeapon: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Physical',
              numOfWeapons: 2,
            },
          },
        },
        {
          id: 'yanmiao-trait-normal-atk-buff-3-phys',
          displayName: 'Yan Miao trait - 3 physical weapons',
          description:
            'For every 1 physical weapon equipped, increase normal attack damage of Equilibrium by 20%, up to 40%.',
          normalAttackBuff: {
            forWeapon: 'Yan Miao',
            value: 0.4,
          },
          maxStacks: 1,
          triggeredBy: {
            activeWeapon: 'Yan Miao',
          },
          duration: {
            followActiveWeapon: true,
          },
          cooldown: 0,
          requirements: {
            elementalTypeWeaponsInTeam: {
              elementalType: 'Physical',
              numOfWeapons: 3,
            },
          },
        },
      ],
    },
    Yanuo: {
      id: 'Yanuo',
      displayName: 'Yanuo',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'yanuo-trait',
          displayName: 'Yanuo trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
        {
          id: 'yanuo-trait-additional',
          displayName: 'Yanuo trait - additional',
          description:
            'When equipped with Wicked, increase final damage by an additional 6%',
          value: 0.06,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
          requirements: {
            weaponInTeam: 'Yanuo',
          },
        },
      ],
      miscellaneousBuffs: [],
    },
    // TODO: Yu Lan MA/sweeping forms
    'Yu Lan': {
      id: 'Yu Lan',
      displayName: 'Yu Lan',
      attackBuffs: [],
      damageBuffs: [
        {
          id: 'yulan-trait',
          displayName: 'Yu Lan trait',
          description: 'Increase final damage by 18%',
          value: 0.18,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: '[TEMP_TRAIT]',
          maxStacks: 1,
          triggeredBy: {
            combatStart: true,
          },
          duration: {
            untilCombatEnd: true,
          },
          cooldown: 0,
        },
      ],
      miscellaneousBuffs: [],
    },
    Zero: {
      id: 'Zero',
      displayName: 'Zero',
      attackBuffs: [],
      damageBuffs: [],
      miscellaneousBuffs: [],
    },
  },
};
