import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";
import { lanaBase } from "./lana-base";

export const lanaPhysicalFlame = {
  ...lanaBase,
  id: "Lana (Physical-Flame)",
  simulacrumDisplayName: "Lana (Physical-Flame)",
  elementalIcon: "Physical-Flame",
  resonanceElements: ["Physical", "Flame"],
  gearResonanceElements: ["Physical", "Flame"],
  damageElement: "Physical",

  normalAttacks: [...lanaBase.normalAttacks],
  dodgeAttacks: [...lanaBase.dodgeAttacks],
  skills: [...lanaBase.skills],
  discharges: [...lanaBase.discharges],

  buffs: [...lanaBase.buffs],
  resources: [...lanaBase.resources],
} as const satisfies PartialWeaponDefinition;
