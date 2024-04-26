import type { BuffDefinition } from '../models/v4/buff/buff-definition';

export const commonBuffs: BuffDefinition[] = [
  {
    id: 'volt-resonance',
    displayName: 'Volt Resonance',
    description: '+15% volt ATK when equipping 2 or more volt weapons',
    attackBuffs: [
      {
        value: 0.15,
        elementalTypes: ['Volt'],
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
      anyWeaponInTeam: ['Brevey', 'Huang (Mimi)', 'Rei', 'Yanuo'],
      elementalTypeWeaponsInTeam: [
        {
          elementalType: 'Volt',
          numOfWeapons: 2,
        },
      ],
    },
  },
  {
    id: 'frost-resonance',
    displayName: 'Frost Resonance',
    description: '+15% frost ATK when equipping 2 or more frost weapons',
    attackBuffs: [
      {
        value: 0.15,
        elementalTypes: ['Frost'],
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
      anyWeaponInTeam: ['Brevey', 'Rei', 'Yanuo'],
      elementalTypeWeaponsInTeam: [
        {
          elementalType: 'Frost',
          numOfWeapons: 2,
        },
      ],
    },
  },
  {
    id: 'attack-weapon-resonance',
    displayName: 'Attack Resonance',
    description:
      'Equip at least 2 DPS-type weapons to activate. Increase final damage by 10%, which in team play is further increased to 40%.',
    damageBuffs: [
      {
        value: 0.1,
        damageCategory: 'Weapon resonance',
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
    requirements: { weaponResonance: 'Attack' },
  },
  {
    id: 'balance-weapon-resonance',
    displayName: 'Balance Resonance',
    description:
      'Equip at least 1 weapon of any type. Increase final damage and damage reduction by 5%, shatter and healing effect by 20%. In team play, increase final damage by an additional 35% and damage reduction by an additional 10%.',
    damageBuffs: [
      {
        value: 0.05,
        damageCategory: 'Weapon resonance',
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
      },
    ],
    maxStacks: 1,
    triggeredBy: {
      combatStart: true,
    },
    endedBy: { combatEnd: true },
    cooldown: 0,
    requirements: { weaponResonance: 'Balance' },
  },
  {
    id: 'force-impact',
    displayName: 'Force Impact',
    description:
      'When the weapon is fully charged, the next attack applies Force Impact on the enemy for 45 seconds, increasing their frost and volt damage taken by 10%',
    damageBuffs: [
      {
        value: 0.1,
        elementalTypes: ['Frost', 'Volt'],
        damageCategory: 'Enemy debuff', // TODO: unsure
      },
    ],
    maxStacks: 1,
    triggeredBy: {
      fullChargeOfWeapons: ['Brevey', 'Rei'],
      endOfAttacks: ['brevey-skill-million-metz-shockwave'],
    },
    endedBy: {
      duration: 45000,
    },
    cooldown: 15000,
    requirements: {
      anyWeaponInTeam: ['Brevey', 'Rei'],
    },
  },
];
