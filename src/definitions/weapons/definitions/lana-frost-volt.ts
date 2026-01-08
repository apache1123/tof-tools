import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";
import { lanaBase } from "./lana-base";

export const lanaFrostVolt = {
  ...lanaBase,
  id: "Lana (Frost-Volt)",
  simulacrumDisplayName: "Lana (Frost-Volt)",
  elementalIcon: "Frost-Volt",
  resonanceElements: ["Frost", "Volt"],
  gearResonanceElements: ["Frost", "Volt"],
  damageElement: "Frost",

  normalAttacks: [...lanaBase.normalAttacks],
  dodgeAttacks: [...lanaBase.dodgeAttacks],
  skills: [...lanaBase.skills],
  discharges: [...lanaBase.discharges],

  buffs: [...lanaBase.buffs],
  resources: [...lanaBase.resources],
} as const satisfies PartialWeaponDefinition;
