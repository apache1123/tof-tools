import type { Weapon } from "../../types/weapon/weapon";

export const gnonno = {
  id: "Gnonno",
  displayName: "Gnonno",
  elementalIcon: "Physical",
  resonanceElements: ["Physical"],
  gearResonanceElements: ["Physical"],
  damageElement: "Physical",
  type: "DPS",
  attackPercentBuffs: [
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
  critRateBuffs: [],
  critDamageBuffs: [],
  normalAttacks: [],
  dodgeAttacks: [],
  skills: [],
  discharges: [],
  buffs: [],
  resources: [],
} satisfies Weapon;
