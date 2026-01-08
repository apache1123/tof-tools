import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";
import { lanaBase } from "./lana-base";

export const lanaVoltFrost = {
  ...lanaBase,
  id: "Lana (Volt-Frost)",
  simulacrumDisplayName: "Lana (Volt-Frost)",
  elementalIcon: "Volt-Frost",
  resonanceElements: ["Volt", "Frost"],
  gearResonanceElements: ["Volt", "Frost"],
  damageElement: "Volt",

  normalAttacks: [...lanaBase.normalAttacks],
  dodgeAttacks: [...lanaBase.dodgeAttacks],
  skills: [...lanaBase.skills],
  discharges: [...lanaBase.discharges],

  buffs: [...lanaBase.buffs],
  resources: [...lanaBase.resources],
} as const satisfies PartialWeaponDefinition;
