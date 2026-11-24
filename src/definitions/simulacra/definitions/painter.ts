import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const painter: PartialSimulacrumTrait = {
  id: "Painter",
  displayName: "Painter",
  buffs: [
    {
      id: "Painter trait",
      displayName: "Painter trait",
      description: "Increases Final Damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Painter trait - Painter equipped",
      displayName: "Painter trait - Painter equipped",
      description:
        "When Imperial Staff is equipped, increases the caster's and teammates' Final Damage by 10%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Painter"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.1 }],
    },
  ],
};
