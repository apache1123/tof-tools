import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";
import { lanaBase } from "./lana-base";

export const lanaFlamePhysical = {
  ...lanaBase,
  id: "Lana (Flame-Physical)",
  simulacrumDisplayName: "Lana (Flame-Physical)",
  elementalIcon: "Flame-Physical",
  resonanceElements: ["Flame", "Physical"],
  gearResonanceElements: ["Flame", "Physical"],
  damageElement: "Flame",

  normalAttacks: [...lanaBase.normalAttacks],
  dodgeAttacks: [...lanaBase.dodgeAttacks],
  skills: [...lanaBase.skills],
  discharges: [...lanaBase.discharges],

  buffs: [...lanaBase.buffs],
  resources: [...lanaBase.resources],
} as const satisfies PartialWeaponDefinition;
