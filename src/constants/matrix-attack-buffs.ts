import type { MatrixBuff } from '../models/buff';
import type { Data } from '../models/data';

enum Id {
  Rubilia2pc = 'Rubilia 2pc',
  Fiona2pc = 'Fiona 2pc',
  Lan2pc = 'Lan 2pc',
  Lyra2pc = 'Lyra 2pc',
  Lin2pc = 'Lin 2pc',
  Ruby4pc = 'Ruby 4pc',
  Frigg2pc = 'Frigg 2pc',
  Nemesis2pc = 'Nemesis 2pc',
}

export const matrixAttackBuffsLookup: Data<MatrixBuff> = {
  allIds: [
    Id.Rubilia2pc,
    Id.Fiona2pc,
    Id.Lan2pc,
    Id.Lyra2pc,
    Id.Lin2pc,
    Id.Ruby4pc,
    Id.Frigg2pc,
    Id.Nemesis2pc,
  ],
  byId: {
    [Id.Rubilia2pc]: {
      id: Id.Rubilia2pc,
      displayName: Id.Rubilia2pc,
      starValues: [
        { star: 0, value: 0.145 },
        { star: 1, value: 0.165 },
        { star: 2, value: 0.185 },
        { star: 3, value: 0.205 },
      ],
      description: 'Volt attack only',
    },
    [Id.Fiona2pc]: {
      id: Id.Fiona2pc,
      displayName: Id.Fiona2pc,
      starValues: [
        { star: 0, value: 0.16 },
        { star: 1, value: 0.18 },
        { star: 2, value: 0.2 },
        { star: 3, value: 0.22 },
      ],
    },
    [Id.Lan2pc]: {
      id: Id.Lan2pc,
      displayName: Id.Lan2pc,
      starValues: [
        { star: 0, value: 0.6 },
        { star: 1, value: 0.7 },
        { star: 2, value: 0.8 },
        { star: 3, value: 0.9 },
      ],
      description: 'Equip at least 1 flame weapon',
    },
    [Id.Lyra2pc]: {
      id: Id.Lyra2pc,
      displayName: Id.Lyra2pc,
      starValues: [
        { star: 0, value: 0.13 },
        { star: 1, value: 0.17 },
        { star: 2, value: 0.21 },
        { star: 3, value: 0.25 },
      ],
    },
    [Id.Lin2pc]: {
      id: Id.Lin2pc,
      displayName: Id.Lin2pc,
      starValues: [
        { star: 0, value: 0.105 },
        { star: 1, value: 0.13 },
        { star: 2, value: 0.155 },
        { star: 3, value: 0.18 },
      ],
      description: 'Very small ramp-up',
    },
    [Id.Ruby4pc]: {
      id: Id.Ruby4pc,
      displayName: Id.Ruby4pc,
      starValues: [
        { star: 0, value: 0.08 },
        { star: 1, value: 0.1 },
        { star: 2, value: 0.12 },
        { star: 3, value: 0.15 },
      ],
      description: 'ATK buff upon reaching max stacks',
    },
    [Id.Frigg2pc]: {
      id: Id.Frigg2pc,
      displayName: Id.Frigg2pc,
      starValues: [
        { star: 0, value: 0.08 },
        { star: 1, value: 0.1 },
        { star: 2, value: 0.12 },
        { star: 3, value: 0.15 },
      ],
    },
    [Id.Nemesis2pc]: {
      id: Id.Nemesis2pc,
      displayName: Id.Nemesis2pc,
      starValues: [
        { star: 0, value: 0.08 },
        { star: 1, value: 0.1 },
        { star: 2, value: 0.12 },
        { star: 3, value: 0.15 },
      ],
      description: 'Can be applied by party members; Volt attack only',
    },
  },
};
