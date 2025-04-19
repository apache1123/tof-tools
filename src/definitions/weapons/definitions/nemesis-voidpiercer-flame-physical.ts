import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";
import { nemesisVoidpiercerBase } from "./nemesis-voidpiercer-base";

export const nemesisVoidpiercerFlamePhysical = {
  ...nemesisVoidpiercerBase,
  id: "Nemesis Voidpiercer (Flame-Physical)",
  simulacrumDisplayName: "Nemesis Voidpiercer (Flame-Physical)",
  elementalIcon: "Flame-Physical",
  resonanceElements: ["Flame", "Physical"],
  gearResonanceElements: ["Flame", "Physical"],
  damageElement: "Flame",

  normalAttacks: [...nemesisVoidpiercerBase.normalAttacks],
  dodgeAttacks: [...nemesisVoidpiercerBase.dodgeAttacks],
  skills: [...nemesisVoidpiercerBase.skills],
  discharges: [...nemesisVoidpiercerBase.discharges],

  buffs: [
    ...nemesisVoidpiercerBase.buffs,
    {
      id: "Dark Star: Retrograde",
      displayName: "Dark Star: Retrograde",
      description:
        "With flame-physical stat, Starfall Cleve ignites targets, dealing 35% flame damage per second for 20 seconds while boosting flame damage by 17% for 25 seconds",
      cooldown: 0,
      duration: 25000,
      requirements: {
        teamRequirements: {
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Flame", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: {},
      maxStacks: 1,
      elementalDamageBuffs: [{ value: 0.17, elementalTypes: ["Flame"] }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [...nemesisVoidpiercerBase.resources],
} as const satisfies PartialWeaponDefinition;
