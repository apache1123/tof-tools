import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const umi: SimulacrumTrait = {
  id: "Umi",
  displayName: "Umi",
  buffs: [
    {
      id: "umi-trait",
      displayName: "Umi trait",
      description:
        "Increases final damage by 18% for 30 seconds whenever Umi uses It's Magic Time",
      cooldown: 0,
      duration: 30000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { abilityStart: ["umi-skill-it's-magic-time"] },
      finalDamageBuffs: [{ value: 0.18 }],
      maxStacks: 1,
    },
  ],
};
