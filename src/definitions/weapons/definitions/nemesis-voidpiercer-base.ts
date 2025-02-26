import type { WeaponBuffDefinition } from "../../../models/weapon/weapon-buff-definition";
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

// TODO: this nemesis voidpiercer trait buff can be removed once traits can be selected in gear comparer
export const nemesisVoidpiercerTraitBuffBase = {
  id: "Nemesis Voidpiercer trait",
  displayName:
    "Nemesis Voidpiercer trait buff (assumes you may also equip her trait when using Nemesis Voidpiercer)",
  description:
    "Increase final damage by 18% and gain 12% of elemental damage boost based on the current stat of Star of Oblivion",
  cooldown: 0,
  requirements: {},
  canBePlayerTriggered: false,
  triggeredBy: { combatStart: true },
  maxStacks: 1,
  finalDamageBuffs: [{ value: 0.18 }],
  starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
} as const satisfies Partial<WeaponBuffDefinition>;
