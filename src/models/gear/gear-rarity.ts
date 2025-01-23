export const gearRarities = ["SSR", "Augmented", "Titan"] as const;
export type GearRarity = (typeof gearRarities)[number];
