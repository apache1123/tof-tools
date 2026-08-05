import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const gefion: PartialSimulacrumTrait = {
  id: "Gefion",
  displayName: "Gefion",
  buffs: [
    {
      id: "Gefion trait",
      displayName: "Gefion trait",
      description: "Increases Final DMG by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Gefion trait - additional",
      displayName: "Gefion trait - additional",
      description: "Grants 22% Frost DMG when Fairy Wreath is deployed",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Gefion"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.22, elementalTypes: ["Frost"] }],
    },
  ],
};
