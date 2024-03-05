import type { CommonWeaponAttackBuffDefinition } from '../models/v4/weapon-attack-buff-definition';

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
    triggeredBy: ['combat-start'],
    // {
    //   weaponActions: [
    //     {
    //       weaponName: 'Brevey',
    //       action: 'combat-start',
    //     },
    //     {
    //       weaponName: 'Yanuo',
    //       action: 'combat-start',
    //     },
    //   ],
    // },
    endedBy: ['combat-end'],
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
    triggeredBy: ['combat-start'],
    // {
    //   weaponActions: [
    //     {
    //       weaponName: 'Brevey',
    //       action: 'combat-start',
    //     },
    //   ],
    // },
    endedBy: ['combat-end'],
    elementalWeaponRequirements: [
      {
        weaponElementalType: 'Frost',
        minNumOfWeapons: 2,
      },
    ],
  },
};
