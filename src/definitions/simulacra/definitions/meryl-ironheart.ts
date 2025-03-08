import type { SimulacrumTrait } from "../../../models/simulacrum-trait";

export const merylIronheart: SimulacrumTrait = {
  id: "Meryl Ironheart",
  displayName: "Meryl Ironheart",
  buffs: [
    {
      id: "Meryl Ironheart trait",
      displayName: "Meryl Ironheart trait",
      description: "Increase final damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
      // TODO: weapon charge buff
    },
    {
      id: "Meryl Ironheart trait - additional",
      displayName: "Meryl Ironheart trait - additional",
      description: "When Siege Edge is equipped, increase volt damage by 15%",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Meryl Ironheart"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.15, elementalTypes: ["Volt"] }],
    },
    // TODO: main weapon additional damage
  ],
};
