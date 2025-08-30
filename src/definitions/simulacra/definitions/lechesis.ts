import type { PartialSimulacrumTrait } from "../../types/simulacrum/partial-simulacrum-trait";

export const lechesis: PartialSimulacrumTrait = {
  id: "Lechesis",
  displayName: "Lechesis",
  buffs: [
    {
      id: "Lechesis trait - final damage",
      displayName: "Lechesis trait - final damage",
      description: "Increases Final Damage by 18%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
    },
    {
      id: "Lechesis trait - Lechesis equipped flame buff",
      displayName: "Lechesis trait - Lechesis equipped flame buff",
      description:
        "Increases Flame DMG by 5% when equipped with Eternal Salvation",
      cooldown: 0,
      requirements: { teamRequirements: { anyWeapon: ["Lechesis"] } },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.05, elementalTypes: ["Flame"] }],
    },
    {
      id: "Lechesis trait - non-Benediction buff",
      displayName: "Lechesis trait - non-Benediction buff",
      description:
        "Grants 5% Final Damage boost when activating non-Benediction Resonance",
      cooldown: 0,
      requirements: {
        teamRequirements: { weaponResonance: { isNot: "Benediction" } },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.05 }],
    },
    {
      id: "Lechesis trait - Benediction buff",
      displayName: "Lechesis trait - Benediction buff",
      description:
        "Grants 10,000 basic All Attack when activating Benediction Resonance",
      cooldown: 0,
      requirements: {
        teamRequirements: { weaponResonance: { is: "Benediction" } },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      baseAttackBuffs: [
        {
          value: 10000,
          elementalTypes: ["Flame", "Frost", "Physical", "Volt"],
        },
      ],
    },
  ],
};
