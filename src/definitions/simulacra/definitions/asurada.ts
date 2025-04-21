import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const asurada: PartialSimulacrumTrait = {
  id: "Asurada",
  displayName: "Asurada",
  buffs: [
    {
      id: "Asurada trait",
      displayName: "Asurada trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Asurada trait - additional",
      displayName: "Asurada trait - additional",
      description: "When equipped with Hellfire, increase flame damage by 14%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Asurada"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.14, elementalTypes: ["Flame"] }],
    },
  ],
};
