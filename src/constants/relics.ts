import type { DataAllIds, DataById } from '../models/data';
import type { Relic } from '../models/v4/relics/relic';

export const maxRelicStars = 5;

export type SsrRelicName =
  | 'Alternate Destiny'
  | 'Bubble Gun'
  | 'Colossus Arm'
  | 'Confinement'
  | 'Drone'
  | 'Hologram Projector'
  | 'Hoverboard'
  | 'Mini Pelican'
  | 'Omnium Shield'
  | 'Overdrive Shot'
  | 'Spacetime Rift'
  | 'Speedwalkers'
  | 'Thalassic Heart'
  | 'Triple Mask'
  | 'Type II Couant'
  | 'Type V Armor';

export type SrRelicName =
  | 'Couant'
  | 'Cybernetic Arm'
  | 'Hovering Cannon'
  | 'Jetboard'
  | 'Jetpack'
  | 'Lava Bomb'
  | 'Magnetic Pulse'
  | 'Magnetic Storm'
  | 'Missile Barrage'
  | 'Omnium Handcannon'
  | 'Quantum Cloak'
  | 'Strange Cube';

export type RelicName = SsrRelicName | SrRelicName;

export const ssrRelicsOrder: DataAllIds<SsrRelicName> = [
  'Alternate Destiny',
  'Bubble Gun',
  'Colossus Arm',
  'Confinement',
  'Drone',
  'Hologram Projector',
  'Hoverboard',
  'Mini Pelican',
  'Omnium Shield',
  'Overdrive Shot',
  'Spacetime Rift',
  'Speedwalkers',
  'Thalassic Heart',
  'Triple Mask',
  'Type II Couant',
  'Type V Armor',
];

export const srRelicsOrder: DataAllIds<SrRelicName> = [
  'Couant',
  'Cybernetic Arm',
  'Hovering Cannon',
  'Jetboard',
  'Jetpack',
  'Lava Bomb',
  'Magnetic Pulse',
  'Magnetic Storm',
  'Missile Barrage',
  'Omnium Handcannon',
  'Quantum Cloak',
  'Strange Cube',
];

/** Relics which are commonly used in meta damage-orientated rotations */
export const metaDamageRelics: DataAllIds<RelicName> = [
  'Bubble Gun',
  'Omnium Shield',
  'Overdrive Shot',
  'Thalassic Heart',
  'Triple Mask',
  'Type II Couant',
  'Spacetime Rift',
];

/** Relics for which it is important to know the star levels of when calculating damage, because they provide passive damage buffs (usually at 4 stars) (excluding the commonly used relics above)  */
export const passiveBuffRelics: DataAllIds<RelicName> = [
  'Alternate Destiny',
  'Mini Pelican',
  'Confinement',
  'Couant',
  'Cybernetic Arm',
  'Hologram Projector',
  'Hoverboard',
  'Hovering Cannon',
  'Lava Bomb',
  'Magnetic Storm',
  'Missile Barrage',
  'Omnium Handcannon',
  'Quantum Cloak',
  'Strange Cube',
  'Type V Armor',
];

export const relicsLookup: Readonly<DataById<RelicName, Relic>> = {
  'Alternate Destiny': {
    id: 'Alternate Destiny',
    displayName: 'Alternate Destiny',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Alternative Destiny passive damage buff',
        displayName: 'Alternative Destiny passive damage buff',
        description: 'Increase frost damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Frost'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
  },
  'Bubble Gun': {
    id: 'Bubble Gun',
    displayName: 'Bubble Gun',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Bubble Gun passive damage buff',
        displayName: 'Bubble Gun passive damage buff',
        description: 'Increase flame damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Flame'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
      {
        id: 'Bubble Gun Happy Time damage buff',
        displayName: 'Bubble Gun Happy Time damage buff',
        description:
          'Increases the damage dealt by 9% for 60 seconds (assuming max stacks at all times)',
        damageBuff: {
          value: 0.09,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 1',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 2,
        maxStarRequirement: 4,
        remarks:
          'Assumes Happy Time buff is active at all times, for simplicity',
      },
      {
        id: 'Bubble Gun Happy Time damage buff',
        displayName: 'Bubble Gun Happy Time damage buff',
        description:
          'Increases the damage dealt by 12% for 60 seconds (assuming max stacks at all times)',
        damageBuff: {
          value: 0.12,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 1',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 5,
        maxStarRequirement: 5,
        remarks:
          'Assumes Happy Time buff is active at all times, for simplicity',
      },
    ],
    attacks: [],
  },
  'Colossus Arm': {
    id: 'Colossus Arm',
    displayName: 'Colossus Arm',
    rarity: 'SSR',
    buffs: [],
    attacks: [],
    remarks: 'Colossus Arm damage is not calculated',
  },
  Confinement: {
    id: 'Confinement',
    displayName: 'Confinement',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Confinement passive damage buff',
        displayName: 'Confinement passive damage buff',
        description: 'Increase physical damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Physical'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
    remarks:
      'The damage from Confinement itself is not calculated. It is negligible',
  },
  Couant: {
    id: 'Couant',
    displayName: 'Couant',
    rarity: 'SR',
    buffs: [
      {
        id: 'Couant damage buff',
        displayName: 'Couant damage buff',
        description:
          'After shield breaks, increase final damage by 20% for 10 seconds.',
        damageBuff: {
          value: 0.2,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 2',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: {
          value: 10000,
        },
        cooldown: 30000,
        minStarRequirement: 2,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
  },
  'Cybernetic Arm': {
    id: 'Cybernetic Arm',
    displayName: 'Cybernetic Arm',
    rarity: 'SR',
    buffs: [
      {
        id: 'Cybernetic arm passive damage buff',
        displayName: 'Cybernetic arm passive damage buff',
        description: 'Increase frost damage by 1.5%, even if not deployed.',
        damageBuff: {
          value: 0.015,
          elementalTypes: ['Frost'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
  },
  Drone: {
    id: 'Drone',
    displayName: 'Drone',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Drone inspiration damage buff',
        displayName: 'Drone inspiration damage buff',
        description:
          'Every 5 seconds, additionally grant Wanderers one stack of inspiration, increasing damage dealt by 5% per stack.',
        damageBuff: {
          value: 0.15,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 2',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: { value: 25000 },
        cooldown: 120000,
        minStarRequirement: 3,
        maxStarRequirement: 5,
        remarks:
          'Assume a constant 15% damage buff over 25 seconds, for simplicity',
      },
    ],
    attacks: [],
  },
  'Hologram Projector': {
    id: 'Hologram Projector',
    displayName: 'Hologram Projector',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Hologram Projector passive damage buff',
        displayName: 'Hologram Projector passive damage buff',
        description: 'Increase volt damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Volt'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
    // TODO: support hologram damage?
    remarks: 'The damage dealt by the hologram is not calculated',
  },
  Hoverboard: {
    id: 'Hoverboard',
    displayName: 'Hoverboard',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Hoverboard passive damage buff',
        displayName: 'Hoverboard passive damage buff',
        description: 'Increase flame damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Flame'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
  },
  'Hovering Cannon': {
    id: 'Hovering Cannon',
    displayName: 'Hovering Cannon',
    rarity: 'SR',
    buffs: [
      {
        id: 'Hovering Cannon passive damage buff',
        displayName: 'Hovering Cannon passive damage buff',
        description: 'Increase frost damage by 1.5%, even if not deployed.',
        damageBuff: {
          value: 0.015,
          elementalTypes: ['Frost'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
    remarks:
      "The damage from Hovering Cannon's attacks is not calculated. It is negligible",
  },
  Jetboard: {
    id: 'Jetboard',
    displayName: 'Jetboard',
    rarity: 'SR',
    buffs: [],
    attacks: [],
  },
  Jetpack: {
    id: 'Jetpack',
    displayName: 'Jetpack',
    rarity: 'SR',
    buffs: [],
    attacks: [],
  },
  'Lava Bomb': {
    id: 'Lava Bomb',
    displayName: 'Lava Bomb',
    rarity: 'SR',
    buffs: [
      {
        id: 'Lava Bomb passive damage buff',
        displayName: 'Lava Bomb passive damage buff',
        description: 'Increase flame damage by 1.5%, even if not deployed.',
        damageBuff: {
          value: 0.015,
          elementalTypes: ['Flame'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
    remarks:
      'The damage from the Lava Bomb is not calculated. It is negligible',
  },
  'Magnetic Pulse': {
    id: 'Magnetic Pulse',
    displayName: 'Magnetic Pulse',
    rarity: 'SR',
    buffs: [],
    attacks: [],
    remarks:
      'The damage from the Lava Bomb is not calculated. It is negligible',
  },
  'Magnetic Storm': {
    id: 'Magnetic Storm',
    displayName: 'Magnetic Storm',
    rarity: 'SR',
    buffs: [
      {
        id: 'Magnetic Storm passive damage buff',
        displayName: 'Magnetic Storm passive damage buff',
        description: 'Increase volt damage by 1.5%, even if not deployed.',
        damageBuff: {
          value: 0.015,
          elementalTypes: ['Volt'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [
      {
        id: 'Magnetic Storm electric tornadoes',
        displayName: 'Magnetic Storm electric tornadoes',
        dotMultiplier: 1.863,
        dotDuration: 10000,
        elementType: 'Volt',
        cooldown: 100000,
        minStarRequirement: 0,
        maxStarRequirement: 0,
      },
      {
        id: 'Magnetic Storm electric tornadoes',
        displayName: 'Magnetic Storm electric tornadoes',
        dotMultiplier: 3.726,
        dotDuration: 10000,
        elementType: 'Volt',
        cooldown: 100000,
        minStarRequirement: 1,
        maxStarRequirement: 1,
      },
      {
        id: 'Magnetic Storm electric tornadoes',
        displayName: 'Magnetic Storm electric tornadoes',
        dotMultiplier: 4.4712,
        dotDuration: 10000,
        elementType: 'Volt',
        cooldown: 100000,
        minStarRequirement: 2,
        maxStarRequirement: 2,
      },
      {
        id: 'Magnetic Storm electric tornadoes',
        displayName: 'Magnetic Storm electric tornadoes',
        dotMultiplier: 6.7068,
        dotDuration: 10000,
        elementType: 'Volt',
        cooldown: 100000,
        minStarRequirement: 3,
        maxStarRequirement: 5,
      },
    ],
  },
  'Mini Pelican': {
    id: 'Mini Pelican',
    displayName: 'Mini Pelican',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Mini Pelican passive damage buff',
        displayName: 'Mini Pelican passive damage buff',
        description: 'Increase volt damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Volt'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
  },
  'Missile Barrage': {
    id: 'Missile Barrage',
    displayName: 'Missile Barrage',
    rarity: 'SR',
    buffs: [
      {
        id: 'Missile Barrage passive damage buff',
        displayName: 'Missile Barrage passive damage buff',
        description: 'Increase physical damage by 1.5%, even if not deployed.',
        damageBuff: {
          value: 0.015,
          elementalTypes: ['Physical'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
    remarks: 'The damage from the Missile Barrage is not calculated (untested)',
  },
  'Omnium Handcannon': {
    id: 'Omnium Handcannon',
    displayName: 'Omnium Handcannon',
    rarity: 'SR',
    buffs: [
      {
        id: 'Omnium Handcannon passive damage buff',
        displayName: 'Omnium Handcannon passive damage buff',
        description: 'Increase flame damage by 1.5%, even if not deployed.',
        damageBuff: {
          value: 0.015,
          elementalTypes: ['Flame'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
  },
  'Omnium Shield': {
    id: 'Omnium Shield',
    displayName: 'Omnium Shield',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Omnium Shield damage buff',
        displayName: 'Omnium Shield damage buff',
        description:
          'When Wanderers or allies pass through the Omnium Shield, damage dealt increases by 25% for 7 seconds.',
        damageBuff: {
          value: 0.25,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 2',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: { value: 27000 },
        cooldown: 60000,
        minStarRequirement: 5,
        maxStarRequirement: 5,
        remarks:
          'Assuming perfect uptime for the damage buff for 27 seconds in total',
      },
    ],
    attacks: [],
  },
  'Overdrive Shot': {
    id: 'Overdrive Shot',
    displayName: 'Overdrive Shot',
    rarity: 'SSR',
    // TODO: marking buff mechanic
    buffs: [
      {
        id: 'Overdrive Shot passive damage buff',
        displayName: 'Overdrive Shot passive damage buff',
        description: 'Increase physical damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Physical'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
  },
  'Quantum Cloak': {
    id: 'Quantum Cloak',
    displayName: 'Quantum Cloak',
    rarity: 'SR',
    buffs: [
      {
        id: 'Quantum Cloak passive damage buff',
        displayName: 'Quantum Cloak passive damage buff',
        description: 'Increase volt damage by 1.5%, even if not deployed.',
        damageBuff: {
          value: 0.015,
          elementalTypes: ['Volt'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
  },
  'Spacetime Rift': {
    id: 'Spacetime Rift',
    displayName: 'Spacetime Rift',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Spacetime Rift damage buff',
        displayName: 'Spacetime Rift damage buff',
        description: 'Increase damage dealt to targets in the area by 20%.',
        damageBuff: {
          value: 0.2,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'Enemy debuff',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: { value: 15000 },
        cooldown: 100000,
        minStarRequirement: 3,
        maxStarRequirement: 5,
      },
    ],
    attacks: [
      {
        id: 'Spacetime Rift AOE',
        displayName: 'Spacetime Rift AOE',
        dotMultiplier: 0.792,
        dotDuration: 8500,
        elementType: 'Physical',
        cooldown: 100000,
        minStarRequirement: 0,
        maxStarRequirement: 0,
      },
      {
        id: 'Spacetime Rift AOE',
        displayName: 'Spacetime Rift AOE',
        dotMultiplier: 0.792,
        dotDuration: 13500,
        elementType: 'Physical',
        cooldown: 100000,
        minStarRequirement: 1,
        maxStarRequirement: 5,
      },
    ],
  },
  Speedwalkers: {
    id: 'Speedwalkers',
    displayName: 'Speedwalkers',
    rarity: 'SSR',
    buffs: [],
    attacks: [],
  },
  'Strange Cube': {
    id: 'Strange Cube',
    displayName: 'Strange Cube',
    rarity: 'SR',
    buffs: [
      {
        id: 'Strange Cube passive damage buff',
        displayName: 'Strange Cube passive damage buff',
        description: 'Increase volt damage by 1.5%, even if not deployed.',
        damageBuff: {
          value: 0.015,
          elementalTypes: ['Volt'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
    remarks:
      'The damage increase from activating Strange Cube is not implemented.',
  },
  'Thalassic Heart': {
    id: 'Thalassic Heart',
    displayName: 'Thalassic Heart',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Thalassic Heart passive damage buff',
        displayName: 'Thalassic Heart passive damage buff',
        description: 'Increase volt damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Volt'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
      {
        id: 'Thalassic Heart damage buff',
        displayName: 'Thalassic Heart damage buff',
        description:
          'Damage received by targets hit by Thalassic Heart is increased by 4%',
        damageBuff: {
          value: 0.04,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'Enemy debuff',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: { value: 50000 },
        cooldown: 60000,
        minStarRequirement: 0,
        maxStarRequirement: 1,
        remarks:
          'The entire duration of the damage buff is assumed be 50s - which is the entire duration of the Thalassic Heart being deployed (45s) plus the max amount of time the buff lasts for at the end (5s)',
      },
      {
        id: 'Thalassic Heart damage buff',
        displayName: 'Thalassic Heart damage buff',
        description:
          'Damage received by targets hit by Thalassic Heart is increased by 4%',
        damageBuff: {
          value: 0.04,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'Enemy debuff',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: {
          value: 90000,
        },
        cooldown: 60000,
        minStarRequirement: 2,
        maxStarRequirement: 2,
        remarks:
          'Assuming the buff is always active for simplicity, as the Thalassic Heart should be always on-field because its cooldown is shorter than its duration',
      },
      {
        id: 'Thalassic Heart damage buff',
        displayName: 'Thalassic Heart damage buff',
        description:
          'Damage received by targets hit by Thalassic Heart is increased by 9.5%',
        damageBuff: {
          value: 0.095,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'Enemy debuff',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: {
          value: 90000,
        },
        cooldown: 60000,
        minStarRequirement: 3,
        maxStarRequirement: 5,
        remarks:
          'Assuming the buff is always active for simplicity, as the Thalassic Heart should be always on-field because its cooldown is shorter than its duration',
      },
    ],
    // TODO:
    attacks: [],
  },
  'Triple Mask': {
    id: 'Triple Mask',
    displayName: 'Triple Mask',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Triple Mask passive damage buff',
        displayName: 'Triple Mask passive damage buff',
        description: 'Increase frost damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Frost'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
      {
        id: 'Triple Mask damage buff',
        displayName: 'Triple Mask damage buff',
        description:
          'While Triple Mask is deployed, elemental damage is increased by 6%.',
        damageBuff: {
          value: 0.06,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 1',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 2,
        maxStarRequirement: 4,
      },
      {
        id: 'Triple Mask damage buff',
        displayName: 'Triple Mask damage buff',
        description:
          'While Triple Mask is deployed, elemental damage is increased by 12%.',
        damageBuff: {
          value: 0.12,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 1',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 5,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
  },
  'Type II Couant': {
    id: 'Type II Couant',
    displayName: 'Type II Couant',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Type II Couant passive damage buff',
        displayName: 'Type II Couant passive damage buff',
        description: 'Increase flame damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Flame'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
      {
        id: 'Type II Couant damage buff',
        displayName: 'Type II Couant damage buff',
        description:
          'After the shield is broken, increase damage by 20% for 10 seconds',
        damageBuff: {
          value: 0.2,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 2',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: { value: 10000 },
        cooldown: 30000,
        minStarRequirement: 0,
        maxStarRequirement: 1,
      },
      {
        id: 'Type II Couant damage buff',
        displayName: 'Type II Couant damage buff',
        description:
          'After the shield is broken, increase damage by 20% for 12 seconds',
        damageBuff: {
          value: 0.2,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 2',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: { value: 12000 },
        cooldown: 30000,
        minStarRequirement: 1,
        maxStarRequirement: 2,
      },
      {
        id: 'Type II Couant damage buff',
        displayName: 'Type II Couant damage buff',
        description:
          'After the shield is broken, increase damage by 20% for 12 seconds. Ever stack of blessing additionally increases final damage by 1%',
        damageBuff: {
          value: 0.25,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 2',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: { value: 12000 },
        cooldown: 30000,
        minStarRequirement: 3,
        maxStarRequirement: 4,
        remarks: 'Assuming always max stacks of blessing when shield is broken',
      },
      {
        id: 'Type II Couant damage buff',
        displayName: 'Type II Couant damage buff',
        description:
          'After the shield is broken, increase damage by 20% for 12 seconds. Ever stack of blessing additionally increases final damage by 1%. When there are full 5 stacks of blessing, additionally increase final damage by 2.5%',
        damageBuff: {
          value: 0.275,
          elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
          damageCategory: 'DMG buff category 2',
        },
        maxStacks: 1,
        // TODO: trigger
        triggeredBy: {},
        duration: { value: 12000 },
        cooldown: 30000,
        minStarRequirement: 5,
        maxStarRequirement: 5,
        remarks: 'Assuming always max stacks of blessing when shield is broken',
      },
    ],
    attacks: [],
  },
  'Type V Armor': {
    id: 'Type V Armor',
    displayName: 'Type V Armor',
    rarity: 'SSR',
    buffs: [
      {
        id: 'Type V Armor passive damage buff',
        displayName: 'Type V Armor passive damage buff',
        description: 'Increase flame damage by 2%, even if not deployed.',
        damageBuff: {
          value: 0.02,
          elementalTypes: ['Flame'],
          damageCategory: 'Relic passive',
        },
        maxStacks: 1,
        triggeredBy: {
          combatStart: true,
        },
        duration: {
          untilCombatEnd: true,
        },
        cooldown: 0,
        minStarRequirement: 4,
        maxStarRequirement: 5,
      },
    ],
    attacks: [],
    remarks:
      'The damage from the Type V Armor is not calculated and unimplemented',
  },
};
