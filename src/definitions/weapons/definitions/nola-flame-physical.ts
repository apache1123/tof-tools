import type { PartialWeaponDefinition } from "../../types/weapon/partial-weapon-definition";
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

  buffs: [
    ...nolaBase.buffs,
    {
      id: "Nola (Flame-Physical) skill buff",
      displayName: "Nola (Flame-Physical) skill buff (assume 8 Spark stacks)",
      description:
        "When entering Superspeed Mode, consume all Sparks. For every stack consumed, receive 600 base flame ATK and increase Rumble's final damage by 6%",
      cooldown: 25000,
      duration: 23000,
      requirements: {},
      canBePlayerTriggered: false,
      triggeredBy: {}, // TODO:
      maxStacks: 1,
      baseAttackBuffs: [{ value: 4800, elementalTypes: ["Flame"] }],
      finalDamageBuffs: [
        { value: 0.06, restrictedTo: { weapon: "Nola (Flame-Physical)" } },
      ],
      starRequirement: { minStarRequirement: 0, maxStarRequirement: 6 },
    },
  ],
  resources: [...nolaBase.resources],
} as const satisfies PartialWeaponDefinition;
