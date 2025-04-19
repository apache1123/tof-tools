import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";

export const yanuo = {
  id: "Yanuo",
  simulacrumDisplayName: "Yanuo",
  weaponDisplayName: "Wicked",
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
} satisfies PartialWeaponDefinition;
