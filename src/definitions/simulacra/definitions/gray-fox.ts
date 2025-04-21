import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const grayFox: PartialSimulacrumTrait = {
  id: "Gray Fox",
  displayName: "Gray Fox",
  buffs: [
    {
      id: "Gray Fox trait",
      displayName: "Gray Fox trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Gray Fox trait - additional",
      displayName: "Gray Fox trait - additional",
      description:
        "When Benediction Resonance is active: Upon using Magic Transmutation at full Power Scale stacks, increase final damage of the Wanderer and nearby teammates by 10% for seconds",
      cooldown: 0,
      duration: 30000,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Gray Fox"],
          weaponResonance: { is: "Benediction" },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.1 }],
    },
  ],
};
