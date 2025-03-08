import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const icarus: SimulacrumTrait = {
  id: "Icarus",
  displayName: "Icarus",
  buffs: [
    {
      id: "icarus-trait",
      displayName: "Icarus trait",
      description: "After equipping Precious One, increase final damage by 15%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Icarus"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.15 }],
    },
  ],
};
