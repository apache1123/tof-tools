import type { MatrixBuff } from '../models/buff';
import type { Data } from '../models/data';

enum Id {
  Annabella2pc = 'Annabella 2pc',
}

export const matrixCritRateBuffsLookup: Data<MatrixBuff> = {
  allIds: [Id.Annabella2pc],
  byId: {
    [Id.Annabella2pc]: {
      id: Id.Annabella2pc,
      displayName: Id.Annabella2pc,
      starValues: [
        { star: 0, value: 0.04 },
        { star: 1, value: 0.04 },
        { star: 2, value: 0.048 },
        { star: 3, value: 0.048 },
      ],
    },
  },
};
