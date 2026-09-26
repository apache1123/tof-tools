import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const zoey: PartialSimulacrumTrait = {
  id: "Zoey",
  displayName: "Zoey",
  buffs: [
    {
      id: "Zoey trait",
      displayName: "Zoey trait",
      description: "Increases Final Damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Zoey trait - additional",
      displayName: "Zoey trait - additional",
      description: "Increases Physical Damage by 34% when Rosebud is deployed",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Zoey"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.34, elementalTypes: ["Physical"] }],
    },
  ],
};
