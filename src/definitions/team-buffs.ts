import type { BuffAbilityDefinition } from "./types/buff/buff-ability-definition";

export const teamBuffs: BuffAbilityDefinition[] = [
  // Weapon resonances
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

  // Elemental resonances
  {
    id: "altered-resonance",
    displayName: "Altered Resonance",
    description: "+20% ATK when equipping 2 or more altered weapons",
    attackPercentBuffs: [
      {
        value: 0.2,
        elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
      },
    ],
    maxStacks: 1,
    requirements: {
      teamRequirements: {
        anyWeapon: ["Fiona"],
        elementalWeapons: {
          numOfElementalWeapons: [
            { element: "Altered", numOfWeapons: 2 },
            { element: "Altered", numOfWeapons: 3 },
          ],
        },
      },
    },
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
        anyWeapon: [
          "Anka",
          "Annabella",
          "Asuka",
          "Asurada",
          "Claudia Storm Eye",
          "Cobalt-B",
          "Fei Se",
          "Ji Yu",
          "Lan",
          "Liu Huo",
          "Ming Jing",
          "Nola (Flame-Physical)",
          "Nola (Physical-Flame)",
          "Plotti",
          "Ruby",
          "Yan Miao",
          "Zero",
        ],
        elementalWeapons: {
          numOfElementalWeapons: [
            { element: "Flame", numOfWeapons: 2 },
            { element: "Flame", numOfWeapons: 3 },
          ],
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
        anyWeapon: [
          "Alyss",
          "Brevey",
          "Cocoritter",
          "Frigg",
          "Gray Fox",
          "Icarus",
          "Ling Han",
          "Meryl Ironheart",
          "Nola (Frost-Volt)",
          "Nola (Volt-Frost)",
          "Rei",
          "Roslyn",
          "Saki Fuwa",
          "Yanuo",
          "Yu Lan",
        ],
        elementalWeapons: {
          numOfElementalWeapons: [
            { element: "Frost", numOfWeapons: 2 },
            { element: "Frost", numOfWeapons: 3 },
          ],
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
        anyWeapon: [
          "Anka",
          "Asuka",
          "Asurada",
          "Claudia",
          "Claudia Storm Eye",
          "Gnonno",
          "Ji Yu",
          "Lyra",
          "Ming Jing",
          "Nola (Flame-Physical)",
          "Nola (Physical-Flame)",
          "Plotti",
          "Umi",
          "Yan Miao",
        ],
        elementalWeapons: {
          numOfElementalWeapons: [
            { element: "Physical", numOfWeapons: 2 },
            { element: "Physical", numOfWeapons: 3 },
          ],
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
        anyWeapon: [
          "Brevey",
          "Fenrir",
          "Gray Fox",
          "Huang (Mimi)",
          "Meryl Ironheart",
          "Nemesis",
          "Nola (Frost-Volt)",
          "Nola (Volt-Frost)",
          "Rei",
          "Roslyn",
          "Rubilia",
          "Tian Lang",
          "Yanuo",
        ],
        elementalWeapons: {
          numOfElementalWeapons: [
            { element: "Volt", numOfWeapons: 2 },
            { element: "Volt", numOfWeapons: 3 },
          ],
        },
      },
    },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    cooldown: 0,
  },

  // Other elemental resonances
  {
    id: "elemental-balancing",
    displayName: "Elemental Balancing",
    description: "+15% all ATK by equipping 3 weapons of different elements",
    cooldown: 0,
    requirements: {
      teamRequirements: {
        anyWeapon: ["Fenrir"],
        elementalWeapons: { numOfDifferentElementalTypes: 3 },
      },
    },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    maxStacks: 1,
    attackPercentBuffs: [
      {
        value: 0.15,
        elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
      },
    ],
  },

  // Benediction resonances
  {
    id: "flame-benediction",
    displayName: "Flame Benediction",
    description:
      "Increase the entire team's flame ATK by 5% when Benediction Resonance is active",
    attackPercentBuffs: [
      {
        value: 0.05,
        elementalTypes: ["Flame"],
      },
    ],
    maxStacks: 1,
    requirements: {
      teamRequirements: {
        anyWeapon: ["Zero"],
        weaponResonance: { is: "Benediction" },
      },
    },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    cooldown: 0,
  },
  {
    id: "frost-benediction",
    displayName: "Frost Benediction",
    description:
      "Increase the entire team's frost ATK by 5% when Benediction Resonance is active",
    attackPercentBuffs: [
      {
        value: 0.05,
        elementalTypes: ["Frost"],
      },
    ],
    maxStacks: 1,
    requirements: {
      teamRequirements: {
        anyWeapon: ["Cocoritter"],
        weaponResonance: { is: "Benediction" },
      },
    },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    cooldown: 0,
  },
  {
    id: "physical-benediction",
    displayName: "Physical Benediction",
    description:
      "Increase the entire team's physical ATK by 5% when Benediction Resonance is active",
    attackPercentBuffs: [
      {
        value: 0.05,
        elementalTypes: ["Physical"],
      },
    ],
    maxStacks: 1,
    requirements: {
      teamRequirements: {
        anyWeapon: ["Lyra"],
        weaponResonance: { is: "Benediction" },
      },
    },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    cooldown: 0,
  },
  {
    id: "volt-benediction",
    displayName: "Volt Benediction",
    description:
      "Increase the entire team's volt ATK by 5% when Benediction Resonance is active",
    attackPercentBuffs: [
      {
        value: 0.05,
        elementalTypes: ["Volt"],
      },
    ],
    maxStacks: 1,
    requirements: {
      teamRequirements: {
        anyWeapon: ["Nemesis"],
        weaponResonance: { is: "Benediction" },
      },
    },
    canBePlayerTriggered: false,
    triggeredBy: { combatStart: true },
    cooldown: 0,
  },
];
