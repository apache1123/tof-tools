import type { WeaponDefinition } from "../../types/weapon/weapon-definition";
import { nolaBase } from "./nola-base";

export const nolaFrostVolt = {
  ...nolaBase,
  id: "Nola (Frost-Volt)",
  simulacrumDisplayName: "Nola (Frost-Volt)",
  weaponDisplayName: "Rumble (Frost-Volt)",
  elementalIcon: "Frost-Volt",
  resonanceElements: ["Frost", "Volt"],
  gearResonanceElements: ["Frost", "Volt"],
  damageElement: "Frost",
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
