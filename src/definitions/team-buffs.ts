import type { BuffAbilityDefinition } from "./types/buff/buff-ability-definition";

export const teamBuffs: BuffAbilityDefinition[] = [
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
  {
    id: "flame-resonance",
    displayName: "Flame Resonance",
    description: "+15% flame ATK when equipping 2 or more flame weapons",
    attackPercentBuffs: [
      {
        value: 0.15,
        elementalTypes: ["Flame"],
      },
    ],
    maxStacks: 1,
    requirements: {
      teamRequirements: {
        anyWeapon: ["Ming Jing", "Yan Miao"],
        elementalWeapons: {
          numOfElementalWeapons: [{ element: "Flame", numOfWeapons: 2 }],
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
    attackPercentBuffs: [
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
    id: "physical-resonance",
    displayName: "Physical Resonance",
    description: "+15% physical ATK when equipping 2 or more physical weapons",
    attackPercentBuffs: [
      {
        value: 0.15,
        elementalTypes: ["Physical"],
      },
    ],
    maxStacks: 1,
    requirements: {
      teamRequirements: {
        anyWeapon: ["Ming Jing", "Yan Miao"],
        elementalWeapons: {
          numOfElementalWeapons: [{ element: "Physical", numOfWeapons: 2 }],
        },
      },
    },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    cooldown: 0,
  },
  {
    id: "volt-resonance",
    displayName: "Volt Resonance",
    description: "+15% volt ATK when equipping 2 or more volt weapons",
    attackPercentBuffs: [
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
];
