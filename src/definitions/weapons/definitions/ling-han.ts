import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const lingHan = {
  id: "Ling Han",
  simulacrumDisplayName: "Ling Han",
  weaponDisplayName: "Alabaster Tiger",
  elementalIcon: "Frost",
  resonanceElements: ["Frost"],
  gearResonanceElements: ["Frost"],
  damageElement: "Frost",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      id: "Ling Han 1*",
      displayName: "Ling Han 1*",
      description: "+10% frost ATK after launching Frost Blades",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      attackPercentBuffs: [{ value: 0.1, elementalTypes: ["Frost"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} satisfies WeaponDefinition;
