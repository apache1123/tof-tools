import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const yanuo: PartialSimulacrumTrait = {
  id: "Yanuo",
  displayName: "Yanuo",
  buffs: [
    {
      id: "yanuo-trait",
      displayName: "Yanuo trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "yanuo-trait-additional",
      displayName: "Yanuo trait - additional",
      description:
        "When equipped with Wicked, increase final damage by an additional 6%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Yanuo"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.06 }],
    },
  ],
};
