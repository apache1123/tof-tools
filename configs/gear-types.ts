import { Data } from '../src/models/data';
import { GearName, GearType, GearVersion } from '../src/models/gear-type';
import { StatName } from '../src/models/stat-type';

export const gearTypes: Data<GearType> = {
  allIds: [
    GearName.Helmet,
    GearName.Eyepiece,
    GearName.Spaulders,
    GearName.Gloves,
    GearName.Bracers,
    GearName.Armor,
    GearName.CombatEngine,
    GearName.Belt,
    GearName.Legguards,
    GearName.Boots,
    GearName.Exoskeleton,
    GearName.Microreactor,
  ],
  byId: {
    [GearName.Helmet]: {
      name: GearName.Helmet,
      displayName: GearName.Helmet,
      inGameName: 'Helm',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Attack,
        StatName.Resistance,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
      ],
      version: GearVersion.v1,
    },
    [GearName.Eyepiece]: {
      name: GearName.Eyepiece,
      displayName: GearName.Eyepiece,
      inGameName: 'Eyepiece',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Attack,
        StatName.Resistance,
        StatName.HPPercent,
        StatName.CritRatePercent,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.AlteredAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
        StatName.AlteredResistance,
        StatName.PhysicalAttackPercent,
        StatName.FlameAttackPercent,
        StatName.FrostAttackPercent,
        StatName.VoltAttackPercent,
        StatName.PhysicalResistancePercent,
        StatName.FrostResistancePercent,
        StatName.FlameResistancePercent,
        StatName.VoltResistancePercent,
        StatName.AlteredResistancePercent,
      ],
      version: GearVersion.v1,
    },
    [GearName.Spaulders]: {
      name: GearName.Spaulders,
      displayName: GearName.Spaulders,
      inGameName: 'Spaulders',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Attack,
        StatName.Resistance,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
      ],
      version: GearVersion.v1,
    },
    [GearName.Gloves]: {
      name: GearName.Gloves,
      displayName: GearName.Gloves,
      inGameName: 'Handguards',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Crit,
        StatName.Attack,
        StatName.Resistance,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
      ],
      version: GearVersion.v1,
    },
    [GearName.Bracers]: {
      name: GearName.Bracers,
      displayName: GearName.Bracers,
      inGameName: 'Bracers',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Attack,
        StatName.Resistance,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
      ],
      version: GearVersion.v1,
    },
    [GearName.Armor]: {
      name: GearName.Armor,
      displayName: GearName.Armor,
      inGameName: 'Armor',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Attack,
        StatName.Resistance,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
      ],
      version: GearVersion.v1,
    },
    [GearName.CombatEngine]: {
      name: GearName.CombatEngine,
      displayName: GearName.CombatEngine,
      inGameName: 'Combat Engine',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Attack,
        StatName.Resistance,
        StatName.HPPercent,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
        StatName.PhysicalAttackPercent,
        StatName.FlameAttackPercent,
        StatName.FrostAttackPercent,
        StatName.VoltAttackPercent,
        StatName.PhysicalResistancePercent,
        StatName.FrostResistancePercent,
        StatName.FlameResistancePercent,
        StatName.VoltResistancePercent,
        StatName.PhysicalDamagePercent,
        StatName.FlameDamagePercent,
        StatName.FrostDamagePercent,
        StatName.VoltDamagePercent,
      ],
      version: GearVersion.v2,
    },
    [GearName.Belt]: {
      name: GearName.Belt,
      displayName: GearName.Belt,
      inGameName: 'Belt',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Attack,
        StatName.Resistance,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
      ],
      version: GearVersion.v1,
    },
    [GearName.Legguards]: {
      name: GearName.Legguards,
      displayName: GearName.Legguards,
      inGameName: 'Legguards',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Attack,
        StatName.Resistance,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
      ],
      version: GearVersion.v1,
    },
    [GearName.Boots]: {
      name: GearName.Boots,
      displayName: GearName.Boots,
      inGameName: 'Sabatons',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Crit,
        StatName.Attack,
        StatName.Resistance,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
      ],
      version: GearVersion.v1,
    },
    [GearName.Exoskeleton]: {
      name: GearName.Exoskeleton,
      displayName: GearName.Exoskeleton,
      inGameName: 'Exoskeleton',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Attack,
        StatName.Resistance,
        StatName.HPPercent,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
        StatName.PhysicalAttackPercent,
        StatName.FlameAttackPercent,
        StatName.FrostAttackPercent,
        StatName.VoltAttackPercent,
        StatName.PhysicalResistancePercent,
        StatName.FrostResistancePercent,
        StatName.FlameResistancePercent,
        StatName.VoltResistancePercent,
        StatName.PhysicalDamagePercent,
        StatName.FlameDamagePercent,
        StatName.FrostDamagePercent,
        StatName.VoltDamagePercent,
      ],
      version: GearVersion.v2,
    },
    [GearName.Microreactor]: {
      name: GearName.Microreactor,
      displayName: GearName.Microreactor,
      inGameName: 'Microreactor',
      numberOfRandomStats: 4,
      possibleRandomStatTypes: [
        StatName.HP,
        StatName.Attack,
        StatName.Resistance,
        StatName.HPPercent,
        StatName.PhysicalAttack,
        StatName.FrostAttack,
        StatName.FlameAttack,
        StatName.VoltAttack,
        StatName.PhysicalResistance,
        StatName.FrostResistance,
        StatName.FlameResistance,
        StatName.VoltResistance,
        StatName.PhysicalAttackPercent,
        StatName.FlameAttackPercent,
        StatName.FrostAttackPercent,
        StatName.VoltAttackPercent,
        StatName.PhysicalResistancePercent,
        StatName.FrostResistancePercent,
        StatName.FlameResistancePercent,
        StatName.VoltResistancePercent,
        StatName.PhysicalDamagePercent,
        StatName.FlameDamagePercent,
        StatName.FrostDamagePercent,
        StatName.VoltDamagePercent,
      ],
      version: GearVersion.v2,
    },
  },
};
