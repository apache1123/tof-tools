import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const samir: PartialSimulacrumTrait = {
  id: "Samir",
  displayName: "Samir",
  buffs: [
    {
      id: "samir-trait",
      displayName: "Samir trait",
      description:
        "Grant 1 stack of Concentration every 4 seconds when Samir receives no damage. Each stack increases damage dealt by 4%, and can stack up to 5 times.",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.2 }],
      remarks:
        "For simplicity, assume max stacks at all times (+20% damage at all times)",
    },
  ],
};
