import type { DamageBuffDefinition } from '../models/v4/damage-buff/damage-buff-definition';

export const commonDamageBuffs: DamageBuffDefinition[] = [
  {
    id: 'attack-weapon-resonance',
    displayName: 'Attack Resonance',
    description:
      'Equip at least 2 DPS-type weapons to activate. Increase final damage by 10%, which in team play is further increased to 40%.',
    value: 0.1,
    damageCategory: 'Weapon resonance',
    elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
    maxStacks: 1,
    triggeredBy: {
      combatStart: true,
    },
    duration: {
      untilCombatEnd: true,
    },
    cooldown: 0,
    requirements: { weaponResonance: 'Attack' },
  },
  {
    id: 'balance-weapon-resonance',
    displayName: 'Balance Resonance',
    description:
      'Equip at least 1 weapon of any type. Increase final damage and damage reduction by 5%, shatter and healing effect by 20%. In team play, increase final damage by an additional 35% and damage reduction by an additional 10%.',
    value: 0.05,
    damageCategory: 'Weapon resonance',
    elementalTypes: ['Altered', 'Flame', 'Frost', 'Physical', 'Volt'],
    maxStacks: 1,
    triggeredBy: {
      combatStart: true,
    },
    duration: {
      untilCombatEnd: true,
    },
    cooldown: 0,
    requirements: { weaponResonance: 'Balance' },
  },
  {
    id: 'force-impact',
    displayName: 'Force Impact',
    description:
      'When the weapon is fully charged, the next attack applies Force Impact on the enemy for 45 seconds, increasing their frost and volt damage taken by 10%',
    value: 0.1,
    elementalTypes: ['Frost', 'Volt'],
    damageCategory: '[TEMP_UNKNOWN]',
    maxStacks: 1,
    triggeredBy: {
      fullChargeOfWeapons: ['Brevey'],
      weaponAttacks: ['brevey-skill-million-metz-shockwave'],
    },
    duration: {
      value: 45000,
    },
    cooldown: 15000,
    requirements: {
      anyWeaponInTeam: ['Brevey'],
    },
  },
];
