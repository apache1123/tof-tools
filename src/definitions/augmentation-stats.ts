import type { StatName } from "./stat-types";

// If a random stat of X stat-type has the highest roll, the augmentation stats can be of A/B/C stat-type. Prioritized stat-types will be "pulled up" so they almost match X's value (95%), fallback stat-types will not.
export const prioritizedAugmentationStatTypesLookup: Record<
  StatName,
  { prioritizedStatTypes: StatName[]; fallbackStatTypes: StatName[] }
> = {
  ["Altered Attack"]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      "HP",
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
      "Resistance",
    ],
  },
  ["Altered Resistance"]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      "HP",
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
      "Resistance",
    ],
  },
  ["Altered Resistance %"]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      "HP %",
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Attack"]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      "HP",
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
      "Resistance",
    ],
  },
  ["Crit"]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      "HP",
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
      "Resistance",
    ],
  },
  ["Crit Rate %"]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      "HP %",
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Flame Attack"]: {
    prioritizedStatTypes: ["Frost Attack", "Physical Attack", "Volt Attack"],
    fallbackStatTypes: [
      "HP",
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
    ],
  },
  ["Flame Attack %"]: {
    prioritizedStatTypes: [
      "Frost Attack %",
      "Physical Attack %",
      "Volt Attack %",
    ],
    fallbackStatTypes: [
      "HP %",
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Flame Damage %"]: {
    prioritizedStatTypes: [
      "Frost Damage %",
      "Physical Damage %",
      "Volt Damage %",
    ],
    fallbackStatTypes: [
      "HP %",
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Flame Resistance"]: {
    prioritizedStatTypes: [
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
    ],
    fallbackStatTypes: ["HP", "Resistance"],
  },
  ["Flame Resistance %"]: {
    prioritizedStatTypes: [
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
    fallbackStatTypes: ["HP %"],
  },
  ["Frost Attack"]: {
    prioritizedStatTypes: ["Flame Attack", "Physical Attack", "Volt Attack"],
    fallbackStatTypes: [
      "HP",
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
    ],
  },
  ["Frost Attack %"]: {
    prioritizedStatTypes: [
      "Flame Attack %",
      "Physical Attack %",
      "Volt Attack %",
    ],
    fallbackStatTypes: [
      "HP %",
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Frost Damage %"]: {
    prioritizedStatTypes: [
      "Flame Damage %",
      "Physical Damage %",
      "Volt Damage %",
    ],
    fallbackStatTypes: [
      "HP %",
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Frost Resistance"]: {
    prioritizedStatTypes: [
      "Flame Resistance",
      "Physical Resistance",
      "Volt Resistance",
    ],
    fallbackStatTypes: ["HP", "Resistance"],
  },
  ["Frost Resistance %"]: {
    prioritizedStatTypes: [
      "Flame Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
    fallbackStatTypes: ["HP %"],
  },
  ["HP"]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
      "Resistance",
    ],
  },
  ["HP %"]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Physical Attack"]: {
    prioritizedStatTypes: ["Flame Attack", "Frost Attack", "Volt Attack"],
    fallbackStatTypes: [
      "HP",
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
    ],
  },
  ["Physical Attack %"]: {
    prioritizedStatTypes: ["Flame Attack %", "Frost Attack %", "Volt Attack %"],
    fallbackStatTypes: [
      "HP %",
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Physical Damage %"]: {
    prioritizedStatTypes: ["Flame Damage %", "Frost Damage %", "Volt Damage %"],
    fallbackStatTypes: [
      "HP %",
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Physical Resistance"]: {
    prioritizedStatTypes: [
      "Flame Resistance",
      "Frost Resistance",
      "Volt Resistance",
    ],
    fallbackStatTypes: ["HP", "Resistance"],
  },
  ["Physical Resistance %"]: {
    prioritizedStatTypes: [
      "Flame Resistance %",
      "Frost Resistance %",
      "Volt Resistance %",
    ],
    fallbackStatTypes: ["HP %"],
  },
  ["Resistance"]: {
    prioritizedStatTypes: [],
    fallbackStatTypes: [
      "HP",
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
    ],
  },
  ["Volt Attack"]: {
    prioritizedStatTypes: ["Flame Attack", "Frost Attack", "Physical Attack"],
    fallbackStatTypes: [
      "HP",
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
      "Volt Resistance",
    ],
  },
  ["Volt Attack %"]: {
    prioritizedStatTypes: [
      "Flame Attack %",
      "Frost Attack %",
      "Physical Attack %",
    ],
    fallbackStatTypes: [
      "HP %",
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Volt Damage %"]: {
    prioritizedStatTypes: [
      "Flame Damage %",
      "Frost Damage %",
      "Physical Damage %",
    ],
    fallbackStatTypes: [
      "HP %",
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
      "Volt Resistance %",
    ],
  },
  ["Volt Resistance"]: {
    prioritizedStatTypes: [
      "Flame Resistance",
      "Frost Resistance",
      "Physical Resistance",
    ],
    fallbackStatTypes: ["HP", "Resistance"],
  },
  ["Volt Resistance %"]: {
    prioritizedStatTypes: [
      "Flame Resistance %",
      "Frost Resistance %",
      "Physical Resistance %",
    ],
    fallbackStatTypes: ["HP %"],
  },
};
