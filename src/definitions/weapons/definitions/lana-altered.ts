import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";
import { lanaBase } from "./lana-base";

export const lanaAltered = {
  ...lanaBase,
  id: "Lana (Altered)",
  simulacrumDisplayName: "Lana (Altered)",
  elementalIcon: "Altered",
  resonanceElements: ["Altered"],
  gearResonanceElements: [],
  damageElement: "Altered",

  normalAttacks: [...lanaBase.normalAttacks],
  dodgeAttacks: [...lanaBase.dodgeAttacks],
  skills: [...lanaBase.skills],
  discharges: [...lanaBase.discharges],

  buffs: [...lanaBase.buffs],
  resources: [...lanaBase.resources],
} as const satisfies PartialWeaponDefinition;
