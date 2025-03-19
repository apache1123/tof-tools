import type { Data } from "../models/data";
import type { StatType } from "../models/gear/stat-type";

export type StatTypeId =
  | "Altered Attack"
  | "Altered Resistance"
  | "Altered Resistance %"
  | "Attack"
  | "Crit"
  | "Crit Rate %"
  | "Flame Attack"
  | "Flame Attack %"
  | "Flame Damage %"
  | "Flame Resistance"
  | "Flame Resistance %"
  | "Frost Attack"
  | "Frost Attack %"
  | "Frost Damage %"
  | "Frost Resistance"
  | "Frost Resistance %"
  | "HP"
  | "HP %"
  | "Physical Attack"
  | "Physical Attack %"
  | "Physical Damage %"
  | "Physical Resistance"
  | "Physical Resistance %"
  | "Resistance"
  | "Volt Attack"
  | "Volt Attack %"
  | "Volt Damage %"
  | "Volt Resistance"
  | "Volt Resistance %";

export type StatRole =
  | "Attack"
  | "Attack %"
  | "Damage %"
  | "Crit"
  | "Crit %"
  | "Resistance"
  | "Resistance %"
  | "HP"
  | "HP %";

export const statTypesLookup: Data<StatTypeId, StatType> = {
  allIds: [
    "Altered Attack",
    "Altered Resistance",
    "Altered Resistance %",
    "Attack",
    "Crit",
    "Crit Rate %",
    "Flame Attack",
    "Flame Attack %",
    "Flame Damage %",
    "Flame Resistance",
    "Flame Resistance %",
    "Frost Attack",
    "Frost Attack %",
    "Frost Damage %",
    "Frost Resistance",
    "Frost Resistance %",
    "HP",
    "HP %",
    "Physical Attack",
    "Physical Attack %",
    "Physical Damage %",
    "Physical Resistance",
    "Physical Resistance %",
    "Resistance",
    "Volt Attack",
    "Volt Attack %",
    "Volt Damage %",
    "Volt Resistance",
    "Volt Resistance %",
  ],
  byId: {
    ["Altered Attack"]: {
      id: "Altered Attack",
      displayName: "Altered Attack",
      shortDisplayName: "Altered ATK",
      inGameName: "Altered Attack",
      role: "Attack",
      elementalType: "Altered",
      isPercentageBased: false,
      randomStatDefaultValue: 137,
      randomStatMinRollValue: 249,
      randomStatMaxRollValue: 623,
      maxAugmentIncreaseMultiplier: 0,
      maxAugmentIncreaseFlat: 0,
    },
    ["Altered Resistance"]: {
      id: "Altered Resistance",
      displayName: "Altered Resistance",
      shortDisplayName: "Altered RES",
      inGameName: "Altered Resistance",
      role: "Resistance",
      elementalType: "Altered",
      isPercentageBased: false,
      randomStatDefaultValue: 215,
      randomStatMinRollValue: 390,
      randomStatMaxRollValue: 974,
      maxAugmentIncreaseMultiplier: 0,
      maxAugmentIncreaseFlat: 0,
    },
    ["Altered Resistance %"]: {
      id: "Altered Resistance %",
      displayName: "Altered Resistance %",
      shortDisplayName: "Altered RES",
      inGameName: "Altered Resistance",
      role: "Resistance %",
      elementalType: "Altered",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0787,
      randomStatMinRollValue: 0.09,
      randomStatMaxRollValue: 0.09,
      maxAugmentIncreaseMultiplier: 0,
      maxAugmentIncreaseFlat: 0,
    },
    ["Attack"]: {
      id: "Attack",
      displayName: "Attack",
      shortDisplayName: "ATK",
      inGameName: "ATK",
      role: "Attack",
      elementalType: "All",
      isPercentageBased: false,
      randomStatDefaultValue: 52,
      randomStatMinRollValue: 93,
      randomStatMaxRollValue: 234,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 244,
    },
    ["Crit"]: {
      id: "Crit",
      displayName: "Crit",
      shortDisplayName: "Crit",
      inGameName: "Crit",
      role: "Crit",
      elementalType: "All",
      isPercentageBased: false,
      randomStatDefaultValue: 258,
      randomStatMinRollValue: 468,
      randomStatMaxRollValue: 1169,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 1221,
    },
    ["Crit Rate %"]: {
      id: "Crit Rate %",
      displayName: "Crit Rate %",
      shortDisplayName: "Crit Rate",
      inGameName: "Crit Rate",
      role: "Crit %",
      elementalType: "All",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0105,
      randomStatMinRollValue: 0.0119,
      randomStatMaxRollValue: 0.0119,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.014,
    },
    ["Flame Attack"]: {
      id: "Flame Attack",
      displayName: "Flame Attack",
      shortDisplayName: "Flame ATK",
      inGameName: "Flame Attack",
      role: "Attack",
      elementalType: "Flame",
      isPercentageBased: false,
      randomStatDefaultValue: 69,
      randomStatMinRollValue: 125,
      randomStatMaxRollValue: 312,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 325,
    },
    ["Flame Attack %"]: {
      id: "Flame Attack %",
      displayName: "Flame Attack %",
      shortDisplayName: "Flame ATK",
      inGameName: "Flame Attack",
      role: "Attack %",
      elementalType: "Flame",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0126,
      randomStatMinRollValue: 0.0144,
      randomStatMaxRollValue: 0.0144,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00846,
    },
    ["Flame Damage %"]: {
      id: "Flame Damage %",
      displayName: "Flame Damage %",
      shortDisplayName: "Flame DMG",
      inGameName: "Flame Damage",
      role: "Damage %",
      elementalType: "Flame",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0065,
      randomStatMinRollValue: 0.0072,
      randomStatMaxRollValue: 0.0072,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00426,
    },
    ["Flame Resistance"]: {
      id: "Flame Resistance",
      displayName: "Flame Resistance",
      shortDisplayName: "Flame RES",
      inGameName: "Flame Resistance",
      role: "Resistance",
      elementalType: "Flame",
      isPercentageBased: false,
      randomStatDefaultValue: 215,
      randomStatMinRollValue: 390,
      randomStatMaxRollValue: 974,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 1017,
    },
    ["Flame Resistance %"]: {
      id: "Flame Resistance %",
      displayName: "Flame Resistance %",
      shortDisplayName: "Flame RES",
      inGameName: "Flame Resistance",
      role: "Resistance %",
      elementalType: "Flame",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0787,
      randomStatMinRollValue: 0.09,
      randomStatMaxRollValue: 0.09,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.0529,
    },
    ["Frost Attack"]: {
      id: "Frost Attack",
      displayName: "Frost Attack",
      shortDisplayName: "Frost ATK",
      inGameName: "Frost Attack",
      role: "Attack",
      elementalType: "Frost",
      isPercentageBased: false,
      randomStatDefaultValue: 69,
      randomStatMinRollValue: 125,
      randomStatMaxRollValue: 312,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 325,
    },
    ["Frost Attack %"]: {
      id: "Frost Attack %",
      displayName: "Frost Attack %",
      shortDisplayName: "Frost ATK",
      inGameName: "Frost Attack",
      role: "Attack %",
      elementalType: "Frost",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0126,
      randomStatMinRollValue: 0.0144,
      randomStatMaxRollValue: 0.0144,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00846,
    },
    ["Frost Damage %"]: {
      id: "Frost Damage %",
      displayName: "Frost Damage %",
      shortDisplayName: "Frost DMG",
      inGameName: "Frost Damage",
      role: "Damage %",
      elementalType: "Frost",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0065,
      randomStatMinRollValue: 0.0072,
      randomStatMaxRollValue: 0.0072,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00426,
    },
    ["Frost Resistance"]: {
      id: "Frost Resistance",
      displayName: "Frost Resistance",
      shortDisplayName: "Frost RES",
      inGameName: "Frost Resistance",
      role: "Resistance",
      elementalType: "Frost",
      isPercentageBased: false,
      randomStatDefaultValue: 215,
      randomStatMinRollValue: 390,
      randomStatMaxRollValue: 974,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 1017,
    },
    ["Frost Resistance %"]: {
      id: "Frost Resistance %",
      displayName: "Frost Resistance %",
      shortDisplayName: "Frost RES",
      inGameName: "Frost Resistance",
      role: "Resistance %",
      elementalType: "Frost",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0787,
      randomStatMinRollValue: 0.09,
      randomStatMaxRollValue: 0.09,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.0529,
    },
    ["HP"]: {
      id: "HP",
      displayName: "HP",
      shortDisplayName: "HP",
      inGameName: "HP",
      role: "HP",
      elementalType: "None",
      isPercentageBased: false,
      randomStatDefaultValue: 4125,
      randomStatMinRollValue: 7480,
      randomStatMaxRollValue: 18700,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 19525,
    },
    ["HP %"]: {
      id: "HP %",
      displayName: "HP %",
      shortDisplayName: "HP",
      inGameName: "HP",
      role: "HP %",
      elementalType: "None",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0094,
      randomStatMinRollValue: 0.0108,
      randomStatMaxRollValue: 0.0108,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00634,
    },
    ["Physical Attack"]: {
      id: "Physical Attack",
      displayName: "Physical Attack",
      shortDisplayName: "Physical ATK",
      inGameName: "Physical Attack",
      role: "Attack",
      elementalType: "Physical",
      isPercentageBased: false,
      randomStatDefaultValue: 69,
      randomStatMinRollValue: 125,
      randomStatMaxRollValue: 312,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 325,
    },
    ["Physical Attack %"]: {
      id: "Physical Attack %",
      displayName: "Physical Attack %",
      shortDisplayName: "Physical ATK",
      inGameName: "Physical Attack",
      role: "Attack %",
      elementalType: "Physical",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0126,
      randomStatMinRollValue: 0.0144,
      randomStatMaxRollValue: 0.0144,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00846,
    },
    ["Physical Damage %"]: {
      id: "Physical Damage %",
      displayName: "Physical Damage %",
      shortDisplayName: "Physical DMG",
      inGameName: "Physical Damage",
      role: "Damage %",
      elementalType: "Physical",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0065,
      randomStatMinRollValue: 0.0072,
      randomStatMaxRollValue: 0.0072,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00426,
    },
    ["Physical Resistance"]: {
      id: "Physical Resistance",
      displayName: "Physical Resistance",
      shortDisplayName: "Physical RES",
      inGameName: "Physical Resistance",
      role: "Resistance",
      elementalType: "Physical",
      isPercentageBased: false,
      randomStatDefaultValue: 215,
      randomStatMinRollValue: 390,
      randomStatMaxRollValue: 974,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 1017,
    },
    ["Physical Resistance %"]: {
      id: "Physical Resistance %",
      displayName: "Physical Resistance %",
      shortDisplayName: "Physical RES",
      inGameName: "Physical Resistance",
      role: "Resistance %",
      elementalType: "Physical",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0787,
      randomStatMinRollValue: 0.09,
      randomStatMaxRollValue: 0.09,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.0529,
    },
    ["Resistance"]: {
      id: "Resistance",
      displayName: "Resistance",
      shortDisplayName: "RES",
      inGameName: "Resistance",
      role: "Resistance",
      elementalType: "All",
      isPercentageBased: false,
      randomStatDefaultValue: 64,
      randomStatMinRollValue: 117,
      randomStatMaxRollValue: 292,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 305,
    },
    ["Volt Attack"]: {
      id: "Volt Attack",
      displayName: "Volt Attack",
      shortDisplayName: "Volt ATK",
      inGameName: "Volt Attack",
      role: "Attack",
      elementalType: "Volt",
      isPercentageBased: false,
      randomStatDefaultValue: 69,
      randomStatMinRollValue: 125,
      randomStatMaxRollValue: 312,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 325,
    },
    ["Volt Attack %"]: {
      id: "Volt Attack %",
      displayName: "Volt Attack %",
      shortDisplayName: "Volt ATK",
      inGameName: "Volt Attack",
      role: "Attack %",
      elementalType: "Volt",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0126,
      randomStatMinRollValue: 0.0144,
      randomStatMaxRollValue: 0.0144,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00846,
    },
    ["Volt Damage %"]: {
      id: "Volt Damage %",
      displayName: "Volt Damage %",
      shortDisplayName: "Volt DMG",
      inGameName: "Volt Damage",
      role: "Damage %",
      elementalType: "Volt",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0065,
      randomStatMinRollValue: 0.0072,
      randomStatMaxRollValue: 0.0072,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.00426,
    },
    ["Volt Resistance"]: {
      id: "Volt Resistance",
      displayName: "Volt Resistance",
      shortDisplayName: "Volt RES",
      inGameName: "Volt Resistance",
      role: "Resistance",
      elementalType: "Volt",
      isPercentageBased: false,
      randomStatDefaultValue: 215,
      randomStatMinRollValue: 390,
      randomStatMaxRollValue: 974,
      maxAugmentIncreaseMultiplier: 0.1,
      maxAugmentIncreaseFlat: 1017,
    },
    ["Volt Resistance %"]: {
      id: "Volt Resistance %",
      displayName: "Volt Resistance %",
      shortDisplayName: "Volt RES",
      inGameName: "Volt Resistance",
      role: "Resistance %",
      elementalType: "Volt",
      isPercentageBased: true,
      randomStatDefaultValue: 0.0787,
      randomStatMinRollValue: 0.09,
      randomStatMaxRollValue: 0.09,
      maxAugmentIncreaseMultiplier: 0.05,
      maxAugmentIncreaseFlat: 0.0529,
    },
  },
};

export function getStatType(name: StatTypeId) {
  const statType = statTypesLookup.byId[name];
  if (!statType) throw new Error(`Cannot find stat type ${name}`);
  return statType;
}
