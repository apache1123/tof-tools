import type { CommonWeaponPassiveAttackBuffDefinition } from '../models/v4/common-weapon-passive-attack-buff-definition';

export type CommonWeaponPassiveAttackBuffId =
  | 'volt-resonance'
  | 'frost-resonance';

export const commonWeaponPassiveAttackBuffs: Record<
  CommonWeaponPassiveAttackBuffId,
  CommonWeaponPassiveAttackBuffDefinition
> = {
  'volt-resonance': {
    id: 'volt-resonance',
    displayName: 'Volt Resonance',
    description: '+15% volt ATK when equipping 2 or more volt weapons',
    value: 0.15,
    elementalTypes: ['Volt'],
    maxStacks: 1,
    elementalWeaponRequirements: [
      {
        weaponElementalType: 'Volt',
        minNumOfWeapons: 2,
      },
    ],
  },
  'frost-resonance': {
    id: 'frost-resonance',
    displayName: 'Frost Resonance',
    description: '+15% frost ATK when equipping 2 or more frost weapons',
    value: 0.15,
    elementalTypes: ['Frost'],
    maxStacks: 1,
    elementalWeaponRequirements: [
      {
        weaponElementalType: 'Frost',
        minNumOfWeapons: 2,
      },
    ],
  },
};
