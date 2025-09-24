import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const helene: PartialSimulacrumTrait = {
  id: "Helene",
  displayName: "Helene",
  buffs: [
    {
      id: "Helene trait - final damage",
      displayName: "Helene trait - final damage",
      description: "Increases Final Damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Helene trait - Helene equipped frost buff",
      displayName: "Helene trait - Helene equipped frost buff",
      description: "When equipped with Pollux, increases Frost DMG by 18%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Helene"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.18, elementalTypes: ["Frost"] }],
    },
  ],
};
