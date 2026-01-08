import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const lanaBase = {
  id: "Lana",
  simulacrumDisplayName: "Lana",
  weaponDisplayName: "Evolution Cube",
  iconWeaponId: "Lana",
  elementalIcon: "Altered",
  resonanceElements: [],
  gearResonanceElements: [],
  damageElement: "Altered",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [
    {
      id: "Lana 1*",
      displayName: "Lana 1*",
      description: "Increases All Elemental Damage by 7%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [
        {
          value: 0.07,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 1, maxStarRequirement: 6 },
    },
    {
      id: "Lana 3*",
      displayName: "Lana 3*",
      description: "Increases Final Damage by 9%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.09 }],
      starRequirement: { minStarRequirement: 3, maxStarRequirement: 6 },
    },
    {
      id: "Lana 6*",
      displayName: "Lana 6*",
      description: "Increases Final DMG by 21% and All Elemental DMG by 8%",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      elementalDamageBuffs: [
        {
          value: 0.08,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      finalDamageBuffs: [{ value: 0.21 }],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies PartialWeaponDefinition;
