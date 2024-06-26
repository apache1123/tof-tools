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
    endedBy: {
      combatEnd: true,
    },
    cooldown: 0,
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
    endedBy: {
      combatEnd: true,
    },
    cooldown: 0,
  },
  {
    id: 'attack-weapon-resonance',
    displayName: 'Attack Resonance',
    description:
      'Equip at least 2 DPS-type weapons to activate. Increase final damage by 10%, which in team play is further increased to 40%.',
    damageBuffs: [
      {
        value: 0.1,
        damageCategory: 'Resonance - Final damage',
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
      },
    ],
    maxStacks: 1,
    triggeredBy: {
      combatStart: true,
      requirements: { weaponResonance: 'Attack' },
    },
    endedBy: {
      combatEnd: true,
    },
    cooldown: 0,
  },
  {
    id: 'balance-weapon-resonance',
    displayName: 'Balance Resonance',
    description:
      'Equip at least 1 weapon of any type. Increase final damage and damage reduction by 5%, shatter and healing effect by 20%. In team play, increase final damage by an additional 35% and damage reduction by an additional 10%.',
    damageBuffs: [
      {
        value: 0.05,
        damageCategory: 'Resonance - Final damage',
        elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
      },
    ],
    maxStacks: 1,
    triggeredBy: {
      combatStart: true,
      requirements: { weaponResonance: 'Balance' },
    },
    endedBy: { combatEnd: true },
    cooldown: 0,
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
        damageCategory: 'Common - Elemental damage taken',
      },
    ],
    maxStacks: 1,
    triggeredBy: {
      fullChargeOfWeapons: ['Brevey', 'Rei'],
      endOfAttacks: ['brevey-skill-million-metz-shockwave'],
      requirements: {
        anyWeaponInTeam: ['Brevey', 'Rei'],
      },
    },
    endedBy: {
      duration: 45000,
    },
    cooldown: 15000,
  },
];
