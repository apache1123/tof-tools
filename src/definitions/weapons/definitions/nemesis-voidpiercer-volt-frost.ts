import type { WeaponDefinition } from "../../types/weapon/weapon-definition";
import { nemesisVoidpiercerBase } from "./nemesis-voidpiercer-base";

export const nemesisVoidpiercerVoltFrost = {
  ...nemesisVoidpiercerBase,
  id: "Nemesis Voidpiercer (Volt-Frost)",
  simulacrumDisplayName: "Nemesis Voidpiercer (Volt-Frost)",
  elementalIcon: "Volt-Frost",
  resonanceElements: ["Volt", "Frost"],
  gearResonanceElements: ["Volt", "Frost"],
  damageElement: "Volt",

  normalAttacks: [...nemesisVoidpiercerBase.normalAttacks],
  dodgeAttacks: [...nemesisVoidpiercerBase.dodgeAttacks],
  skills: [...nemesisVoidpiercerBase.skills],
  discharges: [...nemesisVoidpiercerBase.discharges],

  buffs: [
    ...nemesisVoidpiercerBase.buffs,
    {
      id: "Dark Star: Pulse",
      displayName: "Dark Star: Pulse",
      description:
        "With volt-frost stat, increases Star of Oblivion's volt damage by 6% for 20 seconds",
      cooldown: 0,
      duration: 20000,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: {},
      maxStacks: 1,
      elementalDamageBuffs: [
        {
          value: 0.06,
          elementalTypes: ["Volt"],
          restrictedTo: { weapon: "Nemesis Voidpiercer (Volt-Frost)" },
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [...nemesisVoidpiercerBase.resources],
} as const satisfies WeaponDefinition;
