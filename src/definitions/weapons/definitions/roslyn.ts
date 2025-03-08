import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const roslyn = {
  id: "Roslyn",
  simulacrumDisplayName: "Roslyn",
  weaponDisplayName: "Calm Waves",
  elementalIcon: "Frost-Volt",
  resonanceElements: ["Frost", "Volt"],
  gearResonanceElements: ["Frost", "Volt"],
  damageElement: "Frost",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} as const satisfies WeaponDefinition;
