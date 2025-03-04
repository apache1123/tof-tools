import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const antoria = {
  id: "Antoria",
  simulacrumDisplayName: "Antoria",
  weaponDisplayName: "Requiem",
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
      id: "Antoria Extreme Attack Switch - Thunderclap",
      displayName: "Antoria Extreme Attack Switch - Thunderclap",
      description:
        "Activating Alpha Attack grants 4% Volt Damage bonus, 10% Final Damage bonus for 20 seconds",
      cooldown: 0,
      duration: 20000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.04, elementalTypes: ["Volt"] }],
      finalDamageBuffs: [{ value: 0.1 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: "Antoria 6*",
      displayName: "Antoria 6*",
      description:
        "Increases Volt Damage bonus from Skill - Extreme Attack Switch - Thunderclap to 28%",
      cooldown: 0,
      duration: 20000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      // Adds on top of base buff 28-4 = 24
      elementalDamageBuffs: [{ value: 0.24, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies WeaponDefinition;
