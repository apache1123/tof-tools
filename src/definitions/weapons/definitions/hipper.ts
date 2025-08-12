import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const hipper = {
  id: "Hipper",
  simulacrumDisplayName: "Hipper",
  weaponDisplayName: "AF-010 Servion",
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
      id: "Hipper 3*",
      displayName: "Hipper 3*",
      description: "Increases volt damage by 11%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.11, elementalTypes: ["Volt"] }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 6 },
    },
    {
      id: "Hipper 6*",
      displayName: "Hipper 6*",
      description: "Increases Final Damage by 26%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.26 }],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies PartialWeaponDefinition;
