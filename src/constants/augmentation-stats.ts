import { StatName } from '../models/stat-type';

// If a random stat of X stat-type has the highest roll, the augmentation stats can be of A/B/C stat-type. Prioritized stat-types will be "pulled up" so they almost match X's value (95%), fallback stat-types will not.
export const prioritizedAugmentationStatTypesLookup: Record<
  StatName,
  { prioritizedStatTypes: StatName[]; fallbackStatTypes: StatName[] }
> = {
  [StatName.AlteredAttack]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      StatName.HP,
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
      StatName.Resistance,
    ],
  },
  [StatName.AlteredResistance]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      StatName.HP,
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
      StatName.Resistance,
    ],
  },
  [StatName.AlteredResistancePercent]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      StatName.HPPercent,
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.Attack]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      StatName.HP,
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
      StatName.Resistance,
    ],
  },
  [StatName.Crit]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      StatName.HP,
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
      StatName.Resistance,
    ],
  },
  [StatName.CritRatePercent]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      StatName.HPPercent,
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.FlameAttack]: {
    prioritizedStatTypes: [
      StatName.FrostAttack,
      StatName.PhysicalAttack,
      StatName.VoltAttack,
    ],
    fallbackStatTypes: [
      StatName.HP,
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
    ],
  },
  [StatName.FlameAttackPercent]: {
    prioritizedStatTypes: [
      StatName.FrostAttackPercent,
      StatName.PhysicalAttackPercent,
      StatName.VoltAttackPercent,
    ],
    fallbackStatTypes: [
      StatName.HPPercent,
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.FlameDamagePercent]: {
    prioritizedStatTypes: [
      StatName.FrostDamagePercent,
      StatName.PhysicalDamagePercent,
      StatName.VoltDamagePercent,
    ],
    fallbackStatTypes: [
      StatName.HPPercent,
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.FlameResistance]: {
    prioritizedStatTypes: [
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
    ],
    fallbackStatTypes: [StatName.HP, StatName.Resistance],
  },
  [StatName.FlameResistancePercent]: {
    prioritizedStatTypes: [
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
    fallbackStatTypes: [StatName.HPPercent],
  },
  [StatName.FrostAttack]: {
    prioritizedStatTypes: [
      StatName.FlameAttack,
      StatName.PhysicalAttack,
      StatName.VoltAttack,
    ],
    fallbackStatTypes: [
      StatName.HP,
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
    ],
  },
  [StatName.FrostAttackPercent]: {
    prioritizedStatTypes: [
      StatName.FlameAttackPercent,
      StatName.PhysicalAttackPercent,
      StatName.VoltAttackPercent,
    ],
    fallbackStatTypes: [
      StatName.HPPercent,
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.FrostDamagePercent]: {
    prioritizedStatTypes: [
      StatName.FlameDamagePercent,
      StatName.PhysicalDamagePercent,
      StatName.VoltDamagePercent,
    ],
    fallbackStatTypes: [
      StatName.HPPercent,
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.FrostResistance]: {
    prioritizedStatTypes: [
      StatName.FlameResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
    ],
    fallbackStatTypes: [StatName.HP, StatName.Resistance],
  },
  [StatName.FrostResistancePercent]: {
    prioritizedStatTypes: [
      StatName.FlameResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
    fallbackStatTypes: [StatName.HPPercent],
  },
  [StatName.HP]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
      StatName.Resistance,
    ],
  },
  [StatName.HPPercent]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.PhysicalAttack]: {
    prioritizedStatTypes: [
      StatName.FlameAttack,
      StatName.FrostAttack,
      StatName.VoltAttack,
    ],
    fallbackStatTypes: [
      StatName.HP,
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
    ],
  },
  [StatName.PhysicalAttackPercent]: {
    prioritizedStatTypes: [
      StatName.FlameAttackPercent,
      StatName.FrostAttackPercent,
      StatName.VoltAttackPercent,
    ],
    fallbackStatTypes: [
      StatName.HPPercent,
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.PhysicalDamagePercent]: {
    prioritizedStatTypes: [
      StatName.FlameDamagePercent,
      StatName.FrostDamagePercent,
      StatName.VoltDamagePercent,
    ],
    fallbackStatTypes: [
      StatName.HPPercent,
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.PhysicalResistance]: {
    prioritizedStatTypes: [
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.VoltResistance,
    ],
    fallbackStatTypes: [StatName.HP, StatName.Resistance],
  },
  [StatName.PhysicalResistancePercent]: {
    prioritizedStatTypes: [
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.VoltResistancePercent,
    ],
    fallbackStatTypes: [StatName.HPPercent],
  },
  [StatName.Resistance]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      StatName.HP,
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
    ],
  },
  [StatName.VoltAttack]: {
    prioritizedStatTypes: [
      StatName.FlameAttack,
      StatName.FrostAttack,
      StatName.PhysicalAttack,
    ],
    fallbackStatTypes: [
      StatName.HP,
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
      StatName.VoltResistance,
    ],
  },
  [StatName.VoltAttackPercent]: {
    prioritizedStatTypes: [
      StatName.FlameAttackPercent,
      StatName.FrostAttackPercent,
      StatName.PhysicalAttackPercent,
    ],
    fallbackStatTypes: [
      StatName.HPPercent,
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.VoltDamagePercent]: {
    prioritizedStatTypes: [
      StatName.FlameDamagePercent,
      StatName.FrostDamagePercent,
      StatName.PhysicalDamagePercent,
    ],
    fallbackStatTypes: [
      StatName.HPPercent,
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
      StatName.VoltResistancePercent,
    ],
  },
  [StatName.VoltResistance]: {
    prioritizedStatTypes: [
      StatName.FlameResistance,
      StatName.FrostResistance,
      StatName.PhysicalResistance,
    ],
    fallbackStatTypes: [StatName.HP, StatName.Resistance],
  },
  [StatName.VoltResistancePercent]: {
    prioritizedStatTypes: [
      StatName.FlameResistancePercent,
      StatName.FrostResistancePercent,
      StatName.PhysicalResistancePercent,
    ],
    fallbackStatTypes: [StatName.HPPercent],
  },
};
