import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const aster = {
  id: "Aster",
  simulacrumDisplayName: "Aster",
  weaponDisplayName: "Twin Stars",
  elementalIcon: "Physical-Flame",
  resonanceElements: ["Physical", "Flame"],
  gearResonanceElements: ["Physical", "Flame"],
  damageElement: "Physical",
  type: "Defense",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      id: "Aster: Photon Surge",
      displayName: "Aster: Photon Surge",
      description:
        "Increases physical damage by 3% for 30s after casting Field Mastery",
      cooldown: 21000,
      duration: 30000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.03, elementalTypes: ["Physical"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: "Aster 3*",
      displayName: "Aster 3*",
      description:
        "Gains an extra 10% Physical Damage Boost and 5% Final Damage Boost upon casting Field Mastery",
      cooldown: 21000,
      duration: 30000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.1, elementalTypes: ["Physical"] }],
      finalDamageBuffs: [{ value: 0.05 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 6 },
    },
    {
      id: "Aster 6*",
      displayName: "Aster 6*",
      description: "Increases Final Damage by 25%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.25 }],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies PartialWeaponDefinition;
