import type { MatrixBuff } from '../models/buff';
import type { Data } from '../models/data';

enum Id {
  Fenrir2pc = 'Fenrir 2pc',
  Annabella4pc = 'Annabella 4pc',
  Crow2pc = 'Crow 2pc',
}

export const matrixCritDamageBuffsLookup: Data<MatrixBuff> = {
  allIds: [Id.Fenrir2pc, Id.Annabella4pc, Id.Crow2pc],
  byId: {
    [Id.Fenrir2pc]: {
      id: Id.Fenrir2pc,
      displayName: Id.Fenrir2pc,
      starValues: [
        { star: 0, value: 0.14 },
        { star: 1, value: 0.15 },
        { star: 2, value: 0.16 },
        { star: 3, value: 0.18 },
      ],
    },
    [Id.Annabella4pc]: {
      id: Id.Annabella4pc,
      displayName: Id.Annabella4pc,
      starValues: [
        { star: 0, value: 0.12 },
        { star: 1, value: 0.14 },
        { star: 2, value: 0.16 },
        { star: 3, value: 0.18 },
      ],
    },
    [Id.Crow2pc]: {
      id: Id.Crow2pc,
      displayName: Id.Crow2pc,
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
