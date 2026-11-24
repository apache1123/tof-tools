import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const painter = {
  id: "Painter",
  simulacrumDisplayName: "Painter",
  weaponDisplayName: "Imperial Staff",
  elementalIcon: "Flame-Physical",
  resonanceElements: ["Flame", "Physical"],
  gearResonanceElements: ["Flame", "Physical"],
  damageElement: "Flame",
  type: "Support",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      id: "Painter 1*",
      displayName: "Painter 1*",
      description: "Increases Flame Damage by 11%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.11, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 6 },
    },
    {
      id: "Painter 5*",
      displayName: "Painter 5*",
      description: "Increases Flame Damage by 11%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.11, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 5, maxStarRequirement: 6 },
    },
    {
      id: "Painter 5* Benediction",
      displayName: "Painter 5* Benediction",
      description:
        "Increases nearby allies' Elemental Damage by 25% when Benediction Resonance is active",
      cooldown: 0,
      requirements: {
        teamRequirements: { weaponResonance: { is: "Benediction" } },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [
        {
          value: 0.25,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 5, maxStarRequirement: 6 },
    },
    {
      id: "Painter 6*",
      displayName: "Painter 6*",
      description: "Increases Final Damage by 36%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.36 }],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
    {
      id: "Painter 6* Benediction",
      displayName: "Painter 6* Benediction",
      description:
        "Grants 20% Crit Rate to nearby allies when Benediction Resonance is active",
      cooldown: 0,
      requirements: {
        teamRequirements: { weaponResonance: { is: "Benediction" } },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      critRateBuffs: [{ value: 0.2 }],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies PartialWeaponDefinition;
