import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const jiYu: SimulacrumTrait = {
  id: "Ji Yu",
  displayName: "Ji Yu",
  buffs: [
    {
      id: "jiyu-trait",
      displayName: "Ji Yu trait",
      description: "Increase final damage by 18%.",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "jiyu-trait-flame",
      displayName: "Ji Yu trait - flame",
      description:
        "When Freeflow is equipped, if there is only 1 target in the zone, increase flame damage by 10%. If there are 2 or more targets, increase flame damage to 14%.",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Ji Yu"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true }, // TODO:
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.1, elementalTypes: ["Flame"] }],
      remarks: "Assume 1 target, and active at all times for simplicity",
    },
  ],
};
