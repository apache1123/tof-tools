import type { Buff } from '../models/buff';
import type { Data } from '../models/data';

// Weapon buffs that aren't always active and require some sort of action to trigger i.e. are not included in the character sheet atk stat naturally
enum ActiveWeaponCritRateBuffId {
  Annabella = 'Annabella',
}

export const activeWeaponCritRateBuffsLookup: Data<
  ActiveWeaponCritRateBuffId,
  Buff
> = {
  allIds: [ActiveWeaponCritRateBuffId.Annabella],
  byId: {
    [ActiveWeaponCritRateBuffId.Annabella]: {
      id: ActiveWeaponCritRateBuffId.Annabella,
      displayName: ActiveWeaponCritRateBuffId.Annabella,
      value: 0.105,
      description:
        "For Annabella's weapon only, after using discharge/skill/dodge/charge attack. Lasts for 15s. 3.5% stacking up to 3 times",
    },
  },
};

// Weapon buffs that are always active in the background or current weapon i.e. are included on the character sheet atk stat
enum PassiveWeaponCritRateBuffId {
  Fenrir6Star = 'Fenrir 6*',
}

export const passiveWeaponCritRateBuffsLookup: Data<
  PassiveWeaponCritRateBuffId,
  Buff
> = {
  allIds: [PassiveWeaponCritRateBuffId.Fenrir6Star],
  byId: {
    [PassiveWeaponCritRateBuffId.Fenrir6Star]: {
      id: PassiveWeaponCritRateBuffId.Fenrir6Star,
      displayName: PassiveWeaponCritRateBuffId.Fenrir6Star,
      value: 0.18,
      description: 'Active when Fenrir is on-field + 5s off-field',
    },
  },
};
