import type { Data } from '../models/data';
import { ElementalType } from '../models/elemental-type';
import type { StatType } from '../models/stat-type';
import { StatName, StatRole } from '../models/stat-type';

export const statTypesLookup: Data<StatName, StatType> = {
  allIds: [
    StatName.AlteredAttack,
    StatName.AlteredResistance,
    StatName.AlteredResistancePercent,
    StatName.Attack,
    StatName.Crit,
    StatName.CritRatePercent,
    StatName.FlameAttack,
    StatName.FlameAttackPercent,
    StatName.FlameDamagePercent,
    StatName.FlameResistance,
    StatName.FlameResistancePercent,
    StatName.FrostAttack,
    StatName.FrostAttackPercent,
    StatName.FrostDamagePercent,
    StatName.FrostResistance,
    StatName.FrostResistancePercent,
    StatName.HP,
    StatName.HPPercent,
    StatName.PhysicalAttack,
    StatName.PhysicalAttackPercent,
    StatName.PhysicalDamagePercent,
    StatName.PhysicalResistance,
    StatName.PhysicalResistancePercent,
    StatName.Resistance,
    StatName.VoltAttack,
    StatName.VoltAttackPercent,
    StatName.VoltDamagePercent,
    StatName.VoltResistance,
    StatName.VoltResistancePercent,
  ],
  byId: {
    [StatName.AlteredAttack]: {
      id: StatName.AlteredAttack,
      displayName: StatName.AlteredAttack,
      inGameName: 'Altered Attack',
      role: StatRole.Attack,
      elementalType: ElementalType.Altered,
      isPercentageBased: false,
      iconImageName: 'altered-attack.png',
      randomStatDefaultValue: 69,
      randomStatMinRollValue: 239,
      randomStatMaxRollValue: 623,
      maxAugmentIncreaseMultiplier: 0,
      maxAugmentIncreaseFlat: 0,
    },
    [StatName.AlteredResistance]: {
      id: StatName.AlteredResistance,
      displayName: StatName.AlteredResistance,
      inGameName: 'Altered Resistance',
      role: StatRole.Resistance,
      elementalType: ElementalType.Altered,
      isPercentageBased: false,
      iconImageName: 'altered-res.png',
      randomStatDefaultValue: 215,
      randomStatMinRollValue: 390,
      randomStatMaxRollValue: 974,
      maxAugmentIncreaseMultiplier: 0,
      maxAugmentIncreaseFlat: 0,
    },
    [StatName.AlteredResistancePercent]: {
      id: StatName.AlteredResistancePercent,
      displayName: StatName.AlteredResistancePercent,
      inGameName: 'Altered Resistance',
      role: StatRole.ResistancePercent,
      elementalType: ElementalType.Altered,
      isPercentageBased: true,
      iconImageName: 'altered-res.png',
      randomStatDefaultValue: 0.0787,
      randomStatMinRollValue: 0.09,
      randomStatMaxRollValue: 0.09,
      maxAugmentIncreaseMultiplier: 0,
      maxAugmentIncreaseFlat: 0,
    },
    [StatName.Attack]: {
      id: StatName.Attack,
      displayName: StatName.Attack,
      inGameName: 'Attack',
      role: StatRole.Attack,
      elementalType: ElementalType.All,
      isPercentageBased: false,
      iconImageName: 'attack.png',
      randomStatDefaultValue: 52,
      randomStatMinRollValue: 93,
      randomStatMaxRollValue: 234,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 244,
    },
    [StatName.Crit]: {
      id: StatName.Crit,
      displayName: StatName.Crit,
      inGameName: 'Crit',
      role: StatRole.Crit,
      elementalType: ElementalType.All,
      isPercentageBased: false,
      iconImageName: 'crit.png',
      randomStatDefaultValue: 258,
      randomStatMinRollValue: 468,
      randomStatMaxRollValue: 1169,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 1221,
    },
    [StatName.CritRatePercent]: {
      id: StatName.CritRatePercent,
      displayName: StatName.CritRatePercent,
      inGameName: 'Crit Rate',
      role: StatRole.CritPercent,
      elementalType: ElementalType.All,
      isPercentageBased: true,
      iconImageName: 'crit.png',
      randomStatDefaultValue: 0.0105,
      randomStatMinRollValue: 0.0119,
      randomStatMaxRollValue: 0.0119,
      maxAugmentIncreaseMultiplier: 0,
      maxAugmentIncreaseFlat: 0,
    },
    [StatName.FlameAttack]: {
      id: StatName.FlameAttack,
      displayName: StatName.FlameAttack,
      inGameName: 'Flame Attack',
      role: StatRole.Attack,
      elementalType: ElementalType.Flame,
      isPercentageBased: false,
      iconImageName: 'flame-attack.png',
      randomStatDefaultValue: 69,
      randomStatMinRollValue: 125,
      randomStatMaxRollValue: 312,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 325,
    },
    [StatName.FlameAttackPercent]: {
      id: StatName.FlameAttackPercent,
      displayName: StatName.FlameAttackPercent,
      inGameName: 'Flame Attack',
      role: StatRole.AttackPercent,
      elementalType: ElementalType.Flame,
      isPercentageBased: true,
      iconImageName: 'flame-attack.png',
      randomStatDefaultValue: 0.0126,
      randomStatMinRollValue: 0.0144,
      randomStatMaxRollValue: 0.0144,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00846,
    },
    [StatName.FlameDamagePercent]: {
      id: StatName.FlameDamagePercent,
      displayName: StatName.FlameDamagePercent,
      inGameName: 'Flame Damage',
      role: StatRole.DamagePercent,
      elementalType: ElementalType.Flame,
      isPercentageBased: true,
      iconImageName: 'flame-attack.png',
      randomStatDefaultValue: 0.0065,
      randomStatMinRollValue: 0.0072,
      randomStatMaxRollValue: 0.0072,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00426,
    },
    [StatName.FlameResistance]: {
      id: StatName.FlameResistance,
      displayName: StatName.FlameResistance,
      inGameName: 'Flame Resistance',
      role: StatRole.Resistance,
      elementalType: ElementalType.Flame,
      isPercentageBased: false,
      iconImageName: 'flame-res.png',
      randomStatDefaultValue: 215,
      randomStatMinRollValue: 390,
      randomStatMaxRollValue: 974,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 1017,
    },
    [StatName.FlameResistancePercent]: {
      id: StatName.FlameResistancePercent,
      displayName: StatName.FlameResistancePercent,
      inGameName: 'Flame Resistance',
      role: StatRole.ResistancePercent,
      elementalType: ElementalType.Flame,
      isPercentageBased: true,
      iconImageName: 'flame-res.png',
      randomStatDefaultValue: 0.0787,
      randomStatMinRollValue: 0.09,
      randomStatMaxRollValue: 0.09,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.0529,
    },
    [StatName.FrostAttack]: {
      id: StatName.FrostAttack,
      displayName: StatName.FrostAttack,
      inGameName: 'Frost Attack',
      role: StatRole.Attack,
      elementalType: ElementalType.Frost,
      isPercentageBased: false,
      iconImageName: 'frost-attack.png',
      randomStatDefaultValue: 69,
      randomStatMinRollValue: 125,
      randomStatMaxRollValue: 312,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 325,
    },
    [StatName.FrostAttackPercent]: {
      id: StatName.FrostAttackPercent,
      displayName: StatName.FrostAttackPercent,
      inGameName: 'Frost Attack',
      role: StatRole.AttackPercent,
      elementalType: ElementalType.Frost,
      isPercentageBased: true,
      iconImageName: 'frost-attack.png',
      randomStatDefaultValue: 0.0126,
      randomStatMinRollValue: 0.0144,
      randomStatMaxRollValue: 0.0144,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00846,
    },
    [StatName.FrostDamagePercent]: {
      id: StatName.FrostDamagePercent,
      displayName: StatName.FrostDamagePercent,
      inGameName: 'Frost Damage',
      role: StatRole.DamagePercent,
      elementalType: ElementalType.Frost,
      isPercentageBased: true,
      iconImageName: 'frost-attack.png',
      randomStatDefaultValue: 0.0065,
      randomStatMinRollValue: 0.0072,
      randomStatMaxRollValue: 0.0072,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00426,
    },
    [StatName.FrostResistance]: {
      id: StatName.FrostResistance,
      displayName: StatName.FrostResistance,
      inGameName: 'Frost Resistance',
      role: StatRole.Resistance,
      elementalType: ElementalType.Frost,
      isPercentageBased: false,
      iconImageName: 'frost-res.png',
      randomStatDefaultValue: 215,
      randomStatMinRollValue: 390,
      randomStatMaxRollValue: 974,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 1017,
    },
    [StatName.FrostResistancePercent]: {
      id: StatName.FrostResistancePercent,
      displayName: StatName.FrostResistancePercent,
      inGameName: 'Frost Resistance',
      role: StatRole.ResistancePercent,
      elementalType: ElementalType.Frost,
      isPercentageBased: true,
      iconImageName: 'frost-res.png',
      randomStatDefaultValue: 0.0787,
      randomStatMinRollValue: 0.09,
      randomStatMaxRollValue: 0.09,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.0529,
    },
    [StatName.HP]: {
      id: StatName.HP,
      displayName: StatName.HP,
      inGameName: 'HP',
      role: StatRole.HP,
      elementalType: ElementalType.None,
      isPercentageBased: false,
      iconImageName: 'hp.png',
      randomStatDefaultValue: 4125,
      randomStatMinRollValue: 7480,
      randomStatMaxRollValue: 18700,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 19525,
    },
    [StatName.HPPercent]: {
      id: StatName.HPPercent,
      displayName: StatName.HPPercent,
      inGameName: 'HP',
      role: StatRole.HPPercent,
      elementalType: ElementalType.None,
      isPercentageBased: true,
      iconImageName: 'hp.png',
      randomStatDefaultValue: 0.0094,
      randomStatMinRollValue: 0.0108,
      randomStatMaxRollValue: 0.0108,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00634,
    },
    [StatName.PhysicalAttack]: {
      id: StatName.PhysicalAttack,
      displayName: StatName.PhysicalAttack,
      inGameName: 'Physical Attack',
      role: StatRole.Attack,
      elementalType: ElementalType.Physical,
      isPercentageBased: false,
      iconImageName: 'attack.png',
      randomStatDefaultValue: 69,
      randomStatMinRollValue: 125,
      randomStatMaxRollValue: 312,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 325,
    },
    [StatName.PhysicalAttackPercent]: {
      id: StatName.PhysicalAttackPercent,
      displayName: StatName.PhysicalAttackPercent,
      inGameName: 'Physical Attack',
      role: StatRole.AttackPercent,
      elementalType: ElementalType.Physical,
      isPercentageBased: true,
      iconImageName: 'attack.png',
      randomStatDefaultValue: 0.0126,
      randomStatMinRollValue: 0.0144,
      randomStatMaxRollValue: 0.0144,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00846,
    },
    [StatName.PhysicalDamagePercent]: {
      id: StatName.PhysicalDamagePercent,
      displayName: StatName.PhysicalDamagePercent,
      inGameName: 'Physical Damage',
      role: StatRole.DamagePercent,
      elementalType: ElementalType.Physical,
      isPercentageBased: true,
      iconImageName: 'attack.png',
      randomStatDefaultValue: 0.0065,
      randomStatMinRollValue: 0.0072,
      randomStatMaxRollValue: 0.0072,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00426,
    },
    [StatName.PhysicalResistance]: {
      id: StatName.PhysicalResistance,
      displayName: StatName.PhysicalResistance,
      inGameName: 'Physical Resistance',
      role: StatRole.Resistance,
      elementalType: ElementalType.Physical,
      isPercentageBased: false,
      iconImageName: 'phys-res.png',
      randomStatDefaultValue: 215,
      randomStatMinRollValue: 390,
      randomStatMaxRollValue: 974,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 1017,
    },
    [StatName.PhysicalResistancePercent]: {
      id: StatName.PhysicalResistancePercent,
      displayName: StatName.PhysicalResistancePercent,
      inGameName: 'Physical Resistance',
      role: StatRole.ResistancePercent,
      elementalType: ElementalType.Physical,
      isPercentageBased: true,
      iconImageName: 'phys-res.png',
      randomStatDefaultValue: 0.0787,
      randomStatMinRollValue: 0.09,
      randomStatMaxRollValue: 0.09,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.0529,
    },
    [StatName.Resistance]: {
      id: StatName.Resistance,
      displayName: StatName.Resistance,
      inGameName: 'Resistance',
      role: StatRole.Resistance,
      elementalType: ElementalType.All,
      isPercentageBased: false,
      iconImageName: 'res.png',
      randomStatDefaultValue: 64,
      randomStatMinRollValue: 117,
      randomStatMaxRollValue: 292,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 305,
    },
    [StatName.VoltAttack]: {
      id: StatName.VoltAttack,
      displayName: StatName.VoltAttack,
      inGameName: 'Volt Attack',
      role: StatRole.Attack,
      elementalType: ElementalType.Volt,
      isPercentageBased: false,
      iconImageName: 'volt-attack.png',
      randomStatDefaultValue: 69,
      randomStatMinRollValue: 125,
      randomStatMaxRollValue: 312,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 325,
    },
    [StatName.VoltAttackPercent]: {
      id: StatName.VoltAttackPercent,
      displayName: StatName.VoltAttackPercent,
      inGameName: 'Volt Attack',
      role: StatRole.AttackPercent,
      elementalType: ElementalType.Volt,
      isPercentageBased: true,
      iconImageName: 'volt-attack.png',
      randomStatDefaultValue: 0.0126,
      randomStatMinRollValue: 0.0144,
      randomStatMaxRollValue: 0.0144,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00846,
    },
    [StatName.VoltDamagePercent]: {
      id: StatName.VoltDamagePercent,
      displayName: StatName.VoltDamagePercent,
      inGameName: 'Volt Damage',
      role: StatRole.DamagePercent,
      elementalType: ElementalType.Volt,
      isPercentageBased: true,
      iconImageName: 'volt-attack.png',
      randomStatDefaultValue: 0.0065,
      randomStatMinRollValue: 0.0072,
      randomStatMaxRollValue: 0.0072,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00426,
    },
    [StatName.VoltResistance]: {
      id: StatName.VoltResistance,
      displayName: StatName.VoltResistance,
      inGameName: 'Volt Resistance',
      role: StatRole.Resistance,
      elementalType: ElementalType.Volt,
      isPercentageBased: false,
      iconImageName: 'volt-res.png',
      randomStatDefaultValue: 215,
      randomStatMinRollValue: 390,
      randomStatMaxRollValue: 974,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 1017,
    },
    [StatName.VoltResistancePercent]: {
      id: StatName.VoltResistancePercent,
      displayName: StatName.VoltResistancePercent,
      inGameName: 'Volt Resistance',
      role: StatRole.ResistancePercent,
      elementalType: ElementalType.Volt,
      isPercentageBased: true,
      iconImageName: 'volt-res.png',
      randomStatDefaultValue: 0.0787,
      randomStatMinRollValue: 0.09,
      randomStatMaxRollValue: 0.09,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.0529,
    },
  },
};
