import type { MatrixBuff } from '../models/buff';
import type { Data } from '../models/data';

// Matrix buffs that aren't always active and require some sort of action to trigger i.e. are not included in the character sheet atk stat naturally
enum ActiveMatrixCritDamageBuffId {
  Annabella4pc = 'Annabella 4pc',
  Crow2pc = 'Crow 2pc',
}

export const activeMatrixCritDamageBuffsLookup: Data<
  ActiveMatrixCritDamageBuffId,
  MatrixBuff
> = {
  allIds: [
    ActiveMatrixCritDamageBuffId.Annabella4pc,
    ActiveMatrixCritDamageBuffId.Crow2pc,
  ],
  byId: {
    [ActiveMatrixCritDamageBuffId.Annabella4pc]: {
      id: ActiveMatrixCritDamageBuffId.Annabella4pc,
      displayName: ActiveMatrixCritDamageBuffId.Annabella4pc,
      starValues: [
        { star: 0, value: 0.12 },
        { star: 1, value: 0.14 },
        { star: 2, value: 0.16 },
        { star: 3, value: 0.18 },
      ],
      description: 'Increases crit DMG after landing a crit',
    },
    [ActiveMatrixCritDamageBuffId.Crow2pc]: {
      id: ActiveMatrixCritDamageBuffId.Crow2pc,
      displayName: ActiveMatrixCritDamageBuffId.Crow2pc,
      starValues: [
        { star: 0, value: 0.144 },
        { star: 1, value: 0.18 },
        { star: 2, value: 0.216 },
        { star: 3, value: 0.252 },
      ],
      description: 'Increase crit dmg 24%/30%/36%/42% to targets under 60% HP',
    },
  },
};

// Matrix buffs that are always active in the background or current weapon i.e. are included on the character sheet atk stat
enum PassiveMatrixCritDamageBuffId {
  Fenrir2pc = 'Fenrir 2pc',
}

export const passiveMatrixCritDamageBuffsLookup: Data<
  PassiveMatrixCritDamageBuffId,
  MatrixBuff
> = {
  allIds: [PassiveMatrixCritDamageBuffId.Fenrir2pc],
  byId: {
    [PassiveMatrixCritDamageBuffId.Fenrir2pc]: {
      id: PassiveMatrixCritDamageBuffId.Fenrir2pc,
      displayName: PassiveMatrixCritDamageBuffId.Fenrir2pc,
      starValues: [
        { star: 0, value: 0.14 },
        { star: 1, value: 0.15 },
        { star: 2, value: 0.16 },
        { star: 3, value: 0.18 },
      ],
      description: 'Increases crit DMG, works off-hand',
    },
  },
};
