import type { WeaponDefinition } from "../../types/weapon/weapon-definition";
import {
  nemesisVoidpiercerBase,
  nemesisVoidpiercerTraitBuffBase,
} from "./nemesis-voidpiercer-base";

export const nemesisVoidpiercerFrostVolt = {
  ...nemesisVoidpiercerBase,
  id: "Nemesis Voidpiercer (Frost-Volt)",
  simulacrumDisplayName: "Nemesis Voidpiercer (Frost-Volt)",
  elementalIcon: "Frost-Volt",
  resonanceElements: ["Frost", "Volt"],
  gearResonanceElements: ["Frost", "Volt"],
  damageElement: "Frost",

  normalAttacks: [...nemesisVoidpiercerBase.normalAttacks],
  dodgeAttacks: [...nemesisVoidpiercerBase.dodgeAttacks],
  skills: [...nemesisVoidpiercerBase.skills],
  discharges: [...nemesisVoidpiercerBase.discharges],

  buffs: [
    ...nemesisVoidpiercerBase.buffs,
    {
      id: "Dark Star: Frozen",
      displayName: "Dark Star: Frozen",
      description:
        "With frost-volt stat, boosts Star of Oblivion's final damage by 55% for 25 seconds",
      cooldown: 0,
      duration: 25000,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Frost", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: {},
      maxStacks: 1,
      finalDamageBuffs: [
        {
          value: 0.55,
          restrictedTo: { weapon: "Nemesis Voidpiercer (Frost-Volt)" },
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
    // TODO: this nemesis voidpiercer trait buffs can be removed once traits can be selected in gear comparer
    {
      ...nemesisVoidpiercerTraitBuffBase,
      elementalDamageBuffs: [{ value: 0.12, elementalTypes: ["Frost"] }],
    },
  ],
  resources: [...nemesisVoidpiercerBase.resources],
} as const satisfies WeaponDefinition;
