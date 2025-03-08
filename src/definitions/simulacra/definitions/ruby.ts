import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const ruby: SimulacrumTrait = {
  id: "Ruby",
  displayName: "Ruby",
  buffs: [
    {
      id: "ruby-trait-dolly-atk",
      displayName: "Ruby trait - Dolly ATK increase",
      description:
        "Increases flame ATK after throwing Dolly by 12% for 10 seconds",
      cooldown: 0,
      duration: 10000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { abilityEnd: ["ruby-dodge-go-dolly"] },
      maxStacks: 1,
      attackPercentBuffs: [{ value: 0.12, elementalTypes: ["Flame"] }],
    },
    {
      id: "ruby-trait-dolly-dmg",
      displayName: "Ruby trait - Dolly DMG increase",
      description:
        "Increases the flame damage received by all enemies within 5 meters of Dolly by 8%",
      cooldown: 0,
      duration: 10000,
      maxStacks: 1,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { abilityEnd: ["ruby-dodge-go-dolly"] },
      elementalDamageBuffs: [{ value: 0.08, elementalTypes: ["Flame"] }],
      remarks: "Assumes Dolly remains for 10 seconds and enemy is near it",
    },
  ],
};
