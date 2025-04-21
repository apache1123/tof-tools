import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";
import { nolaBase } from "./nola-base";

export const nolaVoltFrost = {
  ...nolaBase,
  id: "Nola (Volt-Frost)",
  simulacrumDisplayName: "Nola (Volt-Frost)",
  weaponDisplayName: "Rumble (Volt-Frost)",
  elementalIcon: "Volt-Frost",
  resonanceElements: ["Volt", "Frost"],
  gearResonanceElements: ["Volt", "Frost"],
  damageElement: "Volt",

  normalAttacks: [...nolaBase.normalAttacks],
  dodgeAttacks: [...nolaBase.dodgeAttacks],
  skills: [...nolaBase.skills],
  discharges: [...nolaBase.discharges],

  buffs: [...nolaBase.buffs],
  resources: [...nolaBase.resources],
} as const satisfies PartialWeaponDefinition;
