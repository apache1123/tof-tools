import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const crow: SimulacrumTrait = {
  id: "Crow",
  displayName: "Crow",
  buffs: [
    {
      id: "crow-trait",
      displayName: "Crow trait",
      description: "Increase damage dealt by 10% when not in team play",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.1 }],
    },
    {
      id: "crow-trait-combat-start",
      displayName: "Crow trait - entering combat",
      description:
        "Increase damage dealt by 12% for 12 seconds when entering combat",
      cooldown: 0,
      duration: 12000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.12 }],
    },
  ],
};
