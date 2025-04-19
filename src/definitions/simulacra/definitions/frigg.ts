import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const frigg: PartialSimulacrumTrait = {
  id: "Frigg",
  displayName: "Frigg",
  buffs: [
    {
      id: "frigg-trait",
      displayName: "Frigg trait",
      description:
        "Upon entering battle, gain 2.4% frost ATK for 5 seconds every 3 seconds, with up to 10 stacks. Assume max stacks at the start for simplicity",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      attackPercentBuffs: [{ value: 0.24, elementalTypes: ["Frost"] }],
    },
  ],
  remarks:
    "For simplicity, Frigg trait is calculated as max stacks at the start of battle, so it will be stronger than it actually is",
};
