import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const brevey: PartialSimulacrumTrait = {
  id: "Brevey",
  displayName: "Brevey",
  buffs: [
    {
      id: "brevey-trait",
      displayName: "Brevey trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "brevey-trait-additional",
      displayName: "Brevey trait additional",
      description:
        "When Pactcrest ☆ Metz is equipped, increase final damage by an additional 6%.",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Brevey"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.06 }],
    },
  ],
};
