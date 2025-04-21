import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const shiro: PartialSimulacrumTrait = {
  id: "Shiro",
  displayName: "Shiro",
  buffs: [
    {
      id: "shiro-trait",
      displayName: "Shiro trait",
      description:
        "After using a weapon skill/discharge skill, increase all kinds of ATK by 16% and physical ATK by an additional 10% for 8 seconds. Cooldown: 16 seconds.",
      cooldown: 16000,
      duration: 8000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {
        // TODO:
        // endOfAnySkillAttack: true,
        // endOfAnyDischargeAttack: true,
      },
      maxStacks: 1,
      attackPercentBuffs: [
        {
          value: 0.16,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
        { value: 0.1, elementalTypes: ["Physical"] },
      ],
    },
  ],
};
