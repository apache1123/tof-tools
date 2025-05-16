import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const lyncis = {
  id: "Lyncis",
  simulacrumDisplayName: "Lyncis",
  weaponDisplayName: "Swish",
  elementalIcon: "Frost-Volt",
  resonanceElements: ["Frost", "Volt"],
  gearResonanceElements: ["Frost", "Volt"],
  damageElement: "Frost",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      id: "Lyncis: Business Status",
      displayName: "Lyncis: Business Status",
      description:
        "Increases final damage by 18% for 30s after casting Graffiti Party",
      cooldown: 0,
      duration: 30000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.18 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    {
      id: "Lyncis 5*",
      displayName: "Lyncis 5*",
      description: "When Swish is on-field, deals 6% increased frost damage",
      cooldown: 0,
      requirements: { activeWeapon: { is: "Lyncis" } },
      canBePlayerTriggered: false,
      triggeredBy: { activeWeaponChange: true },
      maxStacks: 1,
      elementalDamageBuffs: [
        {
          value: 0.06,
          elementalTypes: ["Frost"],
          restrictedTo: { weapon: "Lyncis" },
        },
      ],
      starRequirement: { minStarRequirement: 5, maxStarRequirement: 6 },
    },
    {
      id: "Lyncis 6*",
      displayName: "Lyncis 6*",
      description:
        "Increases final damage of Business Status to 32%, while granting 3% bonus frost damage",
      cooldown: 0,
      duration: 30000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.03, elementalTypes: ["Frost"] }],
      finalDamageBuffs: [{ value: 0.14 }], // base 18 + 14 = 32
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies PartialWeaponDefinition;
