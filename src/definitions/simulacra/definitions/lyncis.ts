import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const lyncis: PartialSimulacrumTrait = {
  id: "Lyncis",
  displayName: "Lyncis",
  buffs: [
    {
      id: "Lyncis trait - final damage",
      displayName: "Lyncis trait - final damage",
      description: "Increases final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Lyncis trait - frost damage",
      displayName: "Lyncis trait - frost damage",
      description: "When equipped with Swish, deals 10% increased frost damage",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Lyncis"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.1, elementalTypes: ["Frost"] }],
    },
  ],
};
