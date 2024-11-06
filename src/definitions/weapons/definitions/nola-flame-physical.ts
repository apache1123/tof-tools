import type { Weapon } from "../../types/weapon/weapon";
import { nolaBase } from "./nola-base";

export const nolaFlamePhysical = {
  ...nolaBase,
  id: "Nola (Flame-Physical)",
  displayName: "Nola (Flame-Physical)",
  elementalIcon: "Flame-Physical",
  resonanceElements: ["Flame", "Physical"],
  calculationElements: ["Flame", "Physical"],
  damageElement: "Flame",
  // TODO: the flame-physical skill flame base attack buff
  attackPercentBuffs: [
    ...nolaBase.attackPercentBuffs,
    {
      id: "Flame Resonance",
      displayName: "Flame Resonance",
      description: "+15% flame ATK when equipping 2 or more flame weapons",
      value: 0.15,
      elementalTypes: ["Flame"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ["Flame"],
    },
    {
      id: "Physical Resonance",
      displayName: "Physical Resonance",
      description:
        "+15% physical ATK when equipping 2 or more physical weapons",
      value: 0.15,
      elementalTypes: ["Physical"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ["Physical"],
    },
  ],
  critRateBuffs: [...nolaBase.critRateBuffs],
  critDamageBuffs: [...nolaBase.critDamageBuffs],
  normalAttacks: [...nolaBase.normalAttacks],
  dodgeAttacks: [...nolaBase.dodgeAttacks],
  skills: [...nolaBase.skills],
  discharges: [...nolaBase.discharges],
  buffs: [...nolaBase.buffs],
  resources: [...nolaBase.resources],
} as const satisfies Weapon;
