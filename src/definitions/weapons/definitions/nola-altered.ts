import type { WeaponDefinition } from "../../types/weapon/weapon-definition";
import { nolaBase } from "./nola-base";

export const nolaAltered = {
  ...nolaBase,
  id: "Nola (Altered)",
  simulacrumDisplayName: "Nola (Altered)",
  elementalIcon: "Altered",
  resonanceElements: ["Altered"],
  gearResonanceElements: [],
  damageElement: "Altered",

  normalAttacks: [...nolaBase.normalAttacks],
  dodgeAttacks: [...nolaBase.dodgeAttacks],
  skills: [...nolaBase.skills],
  discharges: [...nolaBase.discharges],

  buffs: [...nolaBase.buffs],
  resources: [...nolaBase.resources],
} as const satisfies WeaponDefinition;
