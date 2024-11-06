import type { BuffAbility } from "./types/buff/buff-ability";

export const teamBuffs: BuffAbility[] = [
  {
    id: "volt-resonance",
    displayName: "Volt Resonance",
    description: "+15% volt ATK when equipping 2 or more volt weapons",
    attackBuffs: [
      {
        value: 0.15,
        elementalTypes: ["Volt"],
      },
    ],
    maxStacks: 1,
    requirements: {
      teamRequirements: {
        anyWeapon: ["Brevey", "Huang (Mimi)", "Rei", "Yanuo"],
        elementalWeapons: {
          numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 2 }],
        },
      },
    },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    cooldown: 0,
  },
  {
    id: "frost-resonance",
    displayName: "Frost Resonance",
    description: "+15% frost ATK when equipping 2 or more frost weapons",
    attackBuffs: [
      {
        value: 0.15,
        elementalTypes: ["Frost"],
      },
    ],
    maxStacks: 1,
    requirements: {
      teamRequirements: {
        anyWeapon: ["Brevey", "Rei", "Yanuo"],
        elementalWeapons: {
          numOfElementalWeapons: [{ element: "Frost", numOfWeapons: 2 }],
        },
      },
    },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    cooldown: 0,
  },
  {
    id: "attack-weapon-resonance",
    displayName: "Attack Resonance",
    description:
      "Equip at least 2 DPS-type weapons to activate. Increase final damage by 10%, which in team play is further increased to 40%.",
    finalDamageBuffs: [{ value: 0.1 }],
    maxStacks: 1,
    requirements: { teamRequirements: { weaponResonance: { is: "Attack" } } },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    cooldown: 0,
  },
  {
    id: "balance-weapon-resonance",
    displayName: "Balance Resonance",
    description:
      "Equip at least 1 weapon of any type. Increase final damage and damage reduction by 5%, shatter and healing effect by 20%. In team play, increase final damage by an additional 35% and damage reduction by an additional 10%.",
    finalDamageBuffs: [{ value: 0.05 }],
    maxStacks: 1,
    requirements: { teamRequirements: { weaponResonance: { is: "Balance" } } },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    cooldown: 0,
  },
];
