import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const skull: PartialSimulacrumTrait = {
  id: "Skull",
  displayName: "Skull",
  buffs: [
    {
      id: "Skull trait",
      displayName: "Skull trait",
      description: "Increases Flame Damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.18, elementalTypes: ["Flame"] }],
    },
    {
      id: "Skull trait - additional",
      displayName: "Skull trait - additional",
      description: "Increases Flame Damage by 20% when Silverfang is deployed",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Skull"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.2, elementalTypes: ["Flame"] }],
    },
  ],
};
