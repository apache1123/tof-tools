import type { MatrixBuff } from '../models/buff';
import type { Data } from '../models/data';

// Matrix buffs that aren't always active and require some sort of action to trigger i.e. are not included in the character sheet atk stat naturally
enum ActiveMatrixAttackBuffId {
  Fiona2pc = 'Fiona 2pc',
  Lin2pc = 'Lin 2pc',
  Ruby2pc = 'Ruby 2pc',
  Frigg2pc = 'Frigg 2pc',
  Nemesis2pc = 'Nemesis 2pc',
}

export const activeMatrixAttackBuffsLookup: Data<
  ActiveMatrixAttackBuffId,
  MatrixBuff
> = {
  allIds: [
    ActiveMatrixAttackBuffId.Fiona2pc,
    ActiveMatrixAttackBuffId.Lin2pc,
    ActiveMatrixAttackBuffId.Ruby2pc,
    ActiveMatrixAttackBuffId.Frigg2pc,
    ActiveMatrixAttackBuffId.Nemesis2pc,
  ],
  byId: {
    [ActiveMatrixAttackBuffId.Fiona2pc]: {
      id: ActiveMatrixAttackBuffId.Fiona2pc,
      displayName: ActiveMatrixAttackBuffId.Fiona2pc,
      starValues: [
        { star: 0, value: 0.16 },
        { star: 1, value: 0.18 },
        { star: 2, value: 0.2 },
        { star: 3, value: 0.22 },
      ],
      description: 'Increase ATK after dealing damage, works off-hand',
    },
    [ActiveMatrixAttackBuffId.Lin2pc]: {
      id: ActiveMatrixAttackBuffId.Lin2pc,
      displayName: ActiveMatrixAttackBuffId.Lin2pc,
      starValues: [
        { star: 0, value: 0.105 },
        { star: 1, value: 0.13 },
        { star: 2, value: 0.155 },
        { star: 3, value: 0.18 },
      ],
      description: 'Increase ATK on hit, very small ramp-up',
    },
    [ActiveMatrixAttackBuffId.Ruby2pc]: {
      id: ActiveMatrixAttackBuffId.Ruby2pc,
      displayName: ActiveMatrixAttackBuffId.Ruby2pc,
      starValues: [
        { star: 0, value: 0.08 },
        { star: 1, value: 0.1 },
        { star: 2, value: 0.12 },
        { star: 3, value: 0.15 },
      ],
      description: 'Increase Flame ATK after casting skill',
    },
    [ActiveMatrixAttackBuffId.Frigg2pc]: {
      id: ActiveMatrixAttackBuffId.Frigg2pc,
      displayName: ActiveMatrixAttackBuffId.Frigg2pc,
      starValues: [
        { star: 0, value: 0.08 },
        { star: 1, value: 0.1 },
        { star: 2, value: 0.12 },
        { star: 3, value: 0.15 },
      ],
      description: 'Increase Frost ATK when switching between frost weapons',
    },
    [ActiveMatrixAttackBuffId.Nemesis2pc]: {
      id: ActiveMatrixAttackBuffId.Nemesis2pc,
      displayName: ActiveMatrixAttackBuffId.Nemesis2pc,
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

// Matrix buffs that are always active in the background or current weapon i.e. are included on the character sheet atk stat
enum PassiveMatrixAttackBuffId {
  Rubilia2pc = 'Rubilia 2pc',
  Lan2pc = 'Lan 2pc',
  Lyra2pc = 'Lyra 2pc',
}

export const passiveMatrixAttackBuffsLookup: Data<
  PassiveMatrixAttackBuffId,
  MatrixBuff
> = {
  allIds: [
    PassiveMatrixAttackBuffId.Rubilia2pc,
    PassiveMatrixAttackBuffId.Lan2pc,
    PassiveMatrixAttackBuffId.Lyra2pc,
  ],
  byId: {
    [PassiveMatrixAttackBuffId.Rubilia2pc]: {
      id: PassiveMatrixAttackBuffId.Rubilia2pc,
      displayName: PassiveMatrixAttackBuffId.Rubilia2pc,
      starValues: [
        { star: 0, value: 0.145 },
        { star: 1, value: 0.165 },
        { star: 2, value: 0.185 },
        { star: 3, value: 0.205 },
      ],
      description: 'Increases volt attack only, works off-hand',
    },
    [PassiveMatrixAttackBuffId.Lan2pc]: {
      id: PassiveMatrixAttackBuffId.Lan2pc,
      displayName: PassiveMatrixAttackBuffId.Lan2pc,
      starValues: [
        { star: 0, value: 0.06 },
        { star: 1, value: 0.07 },
        { star: 2, value: 0.08 },
        { star: 3, value: 0.09 },
      ],
      description: 'Equip at least 1 flame weapon, works off-hand',
    },
    [PassiveMatrixAttackBuffId.Lyra2pc]: {
      id: PassiveMatrixAttackBuffId.Lyra2pc,
      displayName: PassiveMatrixAttackBuffId.Lyra2pc,
      starValues: [
        { star: 0, value: 0.13 },
        { star: 1, value: 0.17 },
        { star: 2, value: 0.21 },
        { star: 3, value: 0.25 },
      ],
      description: 'Increase ATK on equipped weapon',
    },
  },
};
