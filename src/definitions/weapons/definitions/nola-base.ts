import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

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
} as const satisfies PartialWeaponDefinition;
