import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const carrot = {
  id: "Carrot",
  simulacrumDisplayName: "Carrot",
  weaponDisplayName: "SLAP",
  elementalIcon: "Flame-Physical",
  resonanceElements: ["Flame", "Physical"],
  gearResonanceElements: ["Flame", "Physical"],
  damageElement: "Flame",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      id: "Carrot Kombat flame damage buff",
      displayName: "Carrot Kombat flame damage buff",
      description:
        "Increases flame damage by 10% for 25s after casing Carrot Kombat",
      cooldown: 0,
      duration: 25000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.1, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: "Carrot 6*",
      displayName: "Carrot 6*",
      description: "Increases final damage by 24%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.24 }],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies PartialWeaponDefinition;
