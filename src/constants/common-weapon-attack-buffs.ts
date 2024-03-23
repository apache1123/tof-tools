import type { CommonWeaponAttackBuffDefinition } from '../models/v4/buffs/common-weapon-attack-buff-definition';

export type CommonWeaponAttackBuffId = 'volt-resonance' | 'frost-resonance';

export const commonWeaponAttackBuffs: Record<
  CommonWeaponAttackBuffId,
  CommonWeaponAttackBuffDefinition
> = {
  'volt-resonance': {
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
      elementalTypeWeaponsInTeam: {
        elementalType: 'Volt',
        numOfWeapons: 2,
      },
    },
  },
  'frost-resonance': {
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
      elementalTypeWeaponsInTeam: {
        elementalType: 'Frost',
        numOfWeapons: 2,
      },
    },
  },
};
