import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const tsubasa: SimulacrumTrait = {
  id: "Tsubasa",
  displayName: "Tsubasa",
  buffs: [
    {
      id: "tsubasa-trait",
      displayName: "Tsubasa trait",
      description:
        "Each time Tsubasa deals damage, gain 1 stack of Fierce Strike, up to 1 stack per 1 second. Each stack adds 0.6% ATK, up to 30 stacks. Refreshes effect duration upon gaining the effect again. The effect lasts for 30 seconds.",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.18,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      remarks: "For simplicity, assume max stacks at all times (+18% ATK)",
    },
  ],
};
