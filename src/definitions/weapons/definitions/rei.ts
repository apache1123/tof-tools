import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const rei = {
  id: "Rei",
  simulacrumDisplayName: "Rei",
  weaponDisplayName: "Salvation",
  elementalIcon: "Volt-Frost",
  resonanceElements: ["Volt", "Frost"],
  gearResonanceElements: ["Volt", "Frost"],
  damageElement: "Volt",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      id: "Energy Consumption - ATK buff",
      displayName: "Energy Consumption",
      description:
        "+15% volt ATK and +5% frost ATK when Energy Consumption is active",
      cooldown: 0,
      requirements: {}, // TODO:
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      attackPercentBuffs: [
        { value: 0.15, elementalTypes: ["Volt"] },
        { value: 0.05, elementalTypes: ["Frost"] },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [
    {
      id: "rei-special-energy",
      displayName: "Rei - Special energy",
      maxAmount: 100,
      startingAmount: 100,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: "rei-homing-arrows-on-enemy",
      displayName: "Rei - Number of homing arrows on enemy",
      maxAmount: 3,
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
} satisfies WeaponDefinition;
