import type { Buff } from '../models/buff';
import type { Data } from '../models/data';

enum Id {
  Fenrir6Star = 'Fenrir 6*',
  Annabella = 'Annabella',
}

export const weaponCritRateBuffsLookup: Data<Id, Buff> = {
  allIds: [Id.Fenrir6Star, Id.Annabella],
  byId: {
    [Id.Fenrir6Star]: {
      id: Id.Fenrir6Star,
      displayName: Id.Fenrir6Star,
      value: 0.18,
      description: 'Active when Fenrir is on-field + 5s off-field',
    },
    [Id.Annabella]: {
      id: Id.Annabella,
      displayName: Id.Annabella,
      value: 0.105,
      description:
        "For Annabella's weapon only, after using discharge/skill/dodge/charge attack. Lasts for 15s. 3.5% stacking up to 3 times",
    },
  },
};
