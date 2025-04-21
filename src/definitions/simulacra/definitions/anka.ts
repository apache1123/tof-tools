import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const anka: PartialSimulacrumTrait = {
  id: "Anka",
  displayName: "Anka",
  buffs: [
    {
      id: "Anka trait",
      displayName: "Anka trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Anka trait - additional",
      displayName: "Anka trait - additional",
      description:
        "After equipping Poppin' Stick, additionally increase final damage by 15% and also additionally increase physical damage dealt to boss targets by 12%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Anka"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.15 }],
      elementalDamageBuffs: [{ value: 0.12, elementalTypes: ["Physical"] }],
    },
  ],
};
