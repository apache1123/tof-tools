import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const shiro = {
  id: "Shiro",
  simulacrumDisplayName: "Shiro",
  weaponDisplayName: "Chakram of the Seas",
  elementalIcon: "Physical",
  resonanceElements: ["Physical"],
  gearResonanceElements: ["Physical"],
  damageElement: "Physical",
  type: "DPS",

  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],

  buffs: [],
  resources: [],
} satisfies WeaponDefinition;
