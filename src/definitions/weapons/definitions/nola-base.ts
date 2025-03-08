import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const nolaBase = {
  id: "Nola",
  simulacrumDisplayName: "Nola",
  weaponDisplayName: "Rumble",
  iconWeaponId: "Nola",
  elementalIcon: "Altered",
  resonanceElements: [],
  gearResonanceElements: [],
  damageElement: "Altered",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} as const satisfies WeaponDefinition;
