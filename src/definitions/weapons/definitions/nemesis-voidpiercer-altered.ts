import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";
import { nemesisVoidpiercerBase } from "./nemesis-voidpiercer-base";

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

  buffs: [...nemesisVoidpiercerBase.buffs],
  resources: [...nemesisVoidpiercerBase.resources],
} as const satisfies PartialWeaponDefinition;
