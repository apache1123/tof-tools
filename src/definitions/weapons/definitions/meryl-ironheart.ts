import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const merylIronheart = {
  id: "Meryl Ironheart",
  simulacrumDisplayName: "Meryl Ironheart",
  weaponDisplayName: "Siege Edge",
  elementalIcon: "Volt-Frost",
  resonanceElements: ["Volt", "Frost"],
  gearResonanceElements: ["Volt", "Frost"],
  damageElement: "Volt",
  type: "Defense",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      id: "Meryl Ironheart Discharge ATK Buff",
      displayName: "Meryl Ironheart discharge",
      description: "+10% volt ATK for 20s on Meryl Ironheart discharge",
      cooldown: 0,
      duration: 20000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      attackPercentBuffs: [{ value: 0.1, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies WeaponDefinition;
