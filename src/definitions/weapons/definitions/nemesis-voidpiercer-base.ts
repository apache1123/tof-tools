import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const nemesisVoidpiercerBase = {
  id: "Nemesis Voidpiercer",
  simulacrumDisplayName: "Nemesis Voidpiercer",
  weaponDisplayName: "Star of Oblivion",
  iconWeaponId: "Nemesis Voidpiercer",
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
      id: "Nemesis Voidpiercer 6*",
      displayName: "Nemesis Voidpiercer 6*",
      description:
        "Increase final damage by 16%, all elemental damage boosted by 16%. Works off-hand",
      cooldown: 0,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      finalDamageBuffs: [{ value: 0.16 }],
      elementalDamageBuffs: [
        {
          value: 0.16,
          elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
        },
      ],
      starRequirement: { minStarRequirement: 6, maxStarRequirement: 6 },
    },
  ],
  resources: [],
} as const satisfies WeaponDefinition;
