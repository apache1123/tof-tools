import type { MatrixBuff } from '../models/buff';
import type { Data } from '../models/data';

// Matrix buffs that aren't always active and require some sort of action to trigger i.e. are not included in the character sheet atk stat naturally
enum ActiveMatrixCritRateBuffId {
  Annabella2pc = 'Annabella 2pc',
}

export const activeMatrixCritRateBuffsLookup: Data<
  ActiveMatrixCritRateBuffId,
  MatrixBuff
> = {
  allIds: [ActiveMatrixCritRateBuffId.Annabella2pc],
  byId: {
    [ActiveMatrixCritRateBuffId.Annabella2pc]: {
      id: ActiveMatrixCritRateBuffId.Annabella2pc,
      displayName: ActiveMatrixCritRateBuffId.Annabella2pc,
      starValues: [
        { star: 0, value: 0.04 },
        { star: 1, value: 0.04 },
        { star: 2, value: 0.048 },
        { star: 3, value: 0.048 },
      ],
      description: 'Increase DMG & crit rate when hitting with a flame weapon',
    },
  },
};
