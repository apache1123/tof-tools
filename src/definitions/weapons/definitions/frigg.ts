import type { WeaponDefinition } from "../../types/weapon/weapon-definition";

export const frigg = {
  id: "Frigg",
  displayName: "Frigg",
  elementalIcon: "Frost",
  resonanceElements: ["Frost"],
  gearResonanceElements: ["Frost"],
  damageElement: "Frost",
  type: "DPS",
  attackPercentBuffs: [
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
      id: "Frost Domain",
      displayName: "Frost Domain",
      description: "Frost Domain gives +15% frost ATK",
      value: 0.15,
      elementalTypes: ["Frost"],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 0,
      maxStarRequirement: 5,
    },
    {
      id: "Frost Domain",
      displayName: "Frost Domain",
      description: "Frost Domain gives +40% frost ATK",
      value: 0.4,
      elementalTypes: ["Frost"],
      canStack: false,
      isActivePassively: false,
      minStarRequirement: 6,
      maxStarRequirement: 6,
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
} satisfies WeaponDefinition;
