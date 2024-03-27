import type { CommonWeaponDamageBuffDefinition } from '../models/v4/damage-buff/common-weapon-damage-buff-definition';

export type CommonWeaponDamageBuffId = 'force-impact';

export const commonWeaponDamageBuffs: Record<
  CommonWeaponDamageBuffId,
  CommonWeaponDamageBuffDefinition
> = {
  'force-impact': {
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
  },
};
