import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const claudiaStormEye: SimulacrumTrait = {
  id: "Claudia Storm Eye",
  displayName: "Claudia Storm Eye",
  buffs: [
    {
      id: "Claudia Storm Eye trait",
      displayName: "Claudia Storm Eye trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Claudia Storm Eye trait - additional",
      displayName: "Claudia Storm Eye trait - additional",
      description:
        "When equipped with Scarlet Gale, increase physical damage by 30%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Claudia Storm Eye"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.3, elementalTypes: ["Physical"] }],
    },
  ],
};
