import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";
import { nemesisVoidpiercerBase } from "./nemesis-voidpiercer-base";

export const nemesisVoidpiercerPhysicalFlame = {
  ...nemesisVoidpiercerBase,
  id: "Nemesis Voidpiercer (Physical-Flame)",
  simulacrumDisplayName: "Nemesis Voidpiercer (Physical-Flame)",
  elementalIcon: "Physical-Flame",
  resonanceElements: ["Physical", "Flame"],
  gearResonanceElements: ["Physical", "Flame"],
  damageElement: "Physical",

  normalAttacks: [...nemesisVoidpiercerBase.normalAttacks],
  dodgeAttacks: [...nemesisVoidpiercerBase.dodgeAttacks],
  skills: [...nemesisVoidpiercerBase.skills],
  discharges: [...nemesisVoidpiercerBase.discharges],

  buffs: [
    ...nemesisVoidpiercerBase.buffs,
    {
      id: "Dark Star: Chaos",
      displayName: "Dark Star: Chaos",
      description:
        "With physical-flame stat, boosts Star of Oblivion's final damage by 21% for 20 seconds",
      cooldown: 0,
      duration: 20000,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Physical", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: {},
      maxStacks: 1,
      finalDamageBuffs: [
        {
          value: 0.21,
          restrictedTo: { weapon: "Nemesis Voidpiercer (Physical-Flame)" },
        },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [...nemesisVoidpiercerBase.resources],
} as const satisfies PartialWeaponDefinition;
