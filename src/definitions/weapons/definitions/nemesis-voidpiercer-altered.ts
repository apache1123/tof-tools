import type { WeaponDefinition } from "../../types/weapon/weapon-definition";
import {
  nemesisVoidpiercerBase,
  nemesisVoidpiercerTraitBuffBase,
} from "./nemesis-voidpiercer-base";

export const nemesisVoidpiercerAltered = {
  ...nemesisVoidpiercerBase,
  id: "Nemesis Voidpiercer (Altered)",
  simulacrumDisplayName: "Nemesis Voidpiercer (Altered)",
  elementalIcon: "Altered",
  resonanceElements: ["Altered"],
  gearResonanceElements: [],
  damageElement: "Altered",

  normalAttacks: [...nemesisVoidpiercerBase.normalAttacks],
  dodgeAttacks: [...nemesisVoidpiercerBase.dodgeAttacks],
  skills: [...nemesisVoidpiercerBase.skills],
  discharges: [...nemesisVoidpiercerBase.discharges],

  buffs: [
    ...nemesisVoidpiercerBase.buffs,
    // TODO: these nemesis voidpiercer trait buffs can be removed once traits can be selected in gear comparer
    {
      ...nemesisVoidpiercerTraitBuffBase,
      elementalDamageBuffs: [{ value: 0.12, elementalTypes: ["Altered"] }],
    },
    {
      id: "Nemesis Voidpiercer trait (altered)",
      displayName:
        "Nemesis Voidpiercer trait altered buff (assumes you may also equip her trait when using Nemesis Voidpiercer)",
      description:
        "If other equipped weapons are also altered weapons, increase crit damage by 16%",
      cooldown: 0,
      requirements: {
        teamRequirements: {
          anyWeapon: ["Nemesis Voidpiercer"],
          elementalWeapons: {
            numOfElementalWeapons: [{ element: "Altered", numOfWeapons: 3 }],
          },
        },
      },
      canBePlayerTriggered: false,
      triggeredBy: { combatStart: true },
      maxStacks: 1,
      critDamageBuffs: [{ value: 0.16 }],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [...nemesisVoidpiercerBase.resources],
} as const satisfies WeaponDefinition;
