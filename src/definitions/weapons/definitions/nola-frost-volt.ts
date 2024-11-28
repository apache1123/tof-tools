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
  attackPercentBuffs: [
    ...nolaBase.attackPercentBuffs,
    {
      id: "Frost Resonance",
      displayName: "Frost Resonance",
      description: "+15% frost ATK when equipping 2 or more frost weapons",
      value: 0.15,
      elementalTypes: ["Frost"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ["Frost"],
    },
    {
      id: "Volt Resonance",
      displayName: "Volt Resonance",
      description: "+15% volt ATK when equipping 2 or more volt weapons",
      value: 0.15,
      elementalTypes: ["Volt"],
      canStack: false,
      isActivePassively: true,
      minStarRequirement: 0,
      maxStarRequirement: 6,
      elementalResonanceRequirements: ["Volt"],
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
} as const satisfies WeaponDefinition;
