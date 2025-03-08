import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const annabella: SimulacrumTrait = {
  id: "Annabella",
  displayName: "Annabella",
  buffs: [
    {
      id: "Annabella trait",
      displayName: "Annabella trait",
      description:
        "For every 1 enemy hit by Gas Explosion, increase Clover Cross's damage by 15% for 20 seconds, stacking up to 2 times",
      cooldown: 0,
      duration: 20000,
      requirements: { teamRequirements: { anyWeapon: ["Annabella"] } },
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO
      maxStacks: 2,
      finalDamageBuffs: [
        { value: 0.15, restrictedTo: { weapon: "Annabella" } },
      ],
    },
  ],
};
