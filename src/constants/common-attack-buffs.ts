import type { AttackBuffDefinition } from '../models/v4/attack-buff/attack-buff-definition';

export const commonAttackBuffs: AttackBuffDefinition[] = [
  {
    id: 'volt-resonance',
    displayName: 'Volt Resonance',
    description: '+15% volt ATK when equipping 2 or more volt weapons',
    value: 0.15,
    elementalTypes: ['Volt'],
    maxStacks: 1,
    triggeredBy: {
      combatStart: true,
    },
    duration: {
      untilCombatEnd: true,
    },
    cooldown: 0,
    requirements: {
      anyWeaponInTeam: ['Brevey', 'Huang (Mimi)', 'Yanuo'],
      elementalTypeWeaponsInTeam: {
        elementalType: 'Volt',
        numOfWeapons: 2,
      },
    },
  },
  {
    id: 'frost-resonance',
    displayName: 'Frost Resonance',
    description: '+15% frost ATK when equipping 2 or more frost weapons',
    value: 0.15,
    elementalTypes: ['Frost'],
    maxStacks: 1,
    triggeredBy: {
      combatStart: true,
    },
    duration: {
      untilCombatEnd: true,
    },
    cooldown: 0,
    requirements: {
      anyWeaponInTeam: ['Brevey', 'Yanuo'],
      elementalTypeWeaponsInTeam: {
        elementalType: 'Frost',
        numOfWeapons: 2,
      },
    },
  },
];
