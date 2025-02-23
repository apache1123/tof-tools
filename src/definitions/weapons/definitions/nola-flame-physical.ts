import type { WeaponDefinition } from "../../types/weapon/weapon-definition";
import { nolaBase } from "./nola-base";

export const nolaFlamePhysical = {
  ...nolaBase,
  id: "Nola (Flame-Physical)",
  simulacrumDisplayName: "Nola (Flame-Physical)",
  weaponDisplayName: "Rumble (Flame-Physical)",
  elementalIcon: "Flame-Physical",
  resonanceElements: ["Flame", "Physical"],
  gearResonanceElements: ["Flame", "Physical"],
  damageElement: "Flame",

  normalAttacks: [...nolaBase.normalAttacks],
  dodgeAttacks: [...nolaBase.dodgeAttacks],
  skills: [...nolaBase.skills],
  discharges: [...nolaBase.discharges],

  // TODO: the flame-physical skill flame base attack buff
  buffs: [...nolaBase.buffs],
  resources: [...nolaBase.resources],
} as const satisfies WeaponDefinition;
