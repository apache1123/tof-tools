import type { WeaponDefinition } from "../../types/weapon/weapon-definition";
import { nolaBase } from "./nola-base";

export const nolaPhysicalFlame = {
  ...nolaBase,
  id: "Nola (Physical-Flame)",
  simulacrumDisplayName: "Nola (Physical-Flame)",
  weaponDisplayName: "Rumble (Physical-Flame)",
  elementalIcon: "Physical-Flame",
  resonanceElements: ["Physical", "Flame"],
  gearResonanceElements: ["Physical", "Flame"],
  damageElement: "Physical",
  attackPercentBuffs: [],
  critRateBuffs: [...nolaBase.critRateBuffs],
  critDamageBuffs: [...nolaBase.critDamageBuffs],
  normalAttacks: [...nolaBase.normalAttacks],
  dodgeAttacks: [...nolaBase.dodgeAttacks],
  skills: [...nolaBase.skills],
  discharges: [...nolaBase.discharges],
  buffs: [...nolaBase.buffs],
  resources: [...nolaBase.resources],
} as const satisfies WeaponDefinition;
