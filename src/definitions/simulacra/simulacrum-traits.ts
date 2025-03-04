import type { Data } from "../../models/data";
import type { SimulacrumTrait } from "../../models/simulacrum-trait";
import type { SimulacrumId } from "./simulacrum-id";

export const simulacrumTraits: Data<SimulacrumId, SimulacrumTrait> = {
  allIds: [
    "Alyss",
    "Anka",
    "Annabella",
    "Asuka",
    "Asurada",
    "Brevey",
    "Claudia",
    "Claudia Storm Eye",
    "Cobalt-B",
    "Cocoritter",
    "Crow",
    "Fei Se",
    "Fenrir",
    "Fiona",
    "Frigg",
    "Gnonno",
    "Gray Fox",
    "Huang (Mimi)",
    "Huma",
    "Icarus",
    "King",
    "Lan",
    "Lin",
    "Ling Han",
    "Liu Huo",
    "Lyra",
    "Meryl",
    "Meryl Ironheart",
    "Ming Jing",
    "Nan Yin",
    "Nemesis",
    "Nemesis Voidpiercer",
    "Nola",
    "Plotti",
    "Rei",
    "Roslyn",
    "Rubilia",
    "Ruby",
    "Saki Fuwa",
    "Samir",
    "Shiro",
    "Tian Lang",
    "Tsubasa",
    "Umi",
    "Yan Miao",
    "Yanuo",
    "Yu Lan",
    "Zero",
  ],
  byId: {
    Alyss: {
      id: "Alyss",
      displayName: "Alyss",
      buffs: [
        {
          id: "alyss-trait",
          displayName: "Alyss trait",
          description:
            "Increase final damage by 18% for 18 seconds after successfully using a weapon skill.",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: {},
          duration: 18000,
          cooldown: 0,
        },
      ],
    },
    Anka: {
      id: "Anka",
      displayName: "Anka",
      // TODO:
      buffs: [],
    },
    Annabella: {
      id: "Annabella",
      displayName: "Annabella",
      // TODO:
      buffs: [],
      remarks: "Annabella trait not implemented yet",
    },
    Antoria: {
      id: "Antoria",
      displayName: "Antoria",
      buffs: [
        {
          id: "Antoria trait - final damage",
          displayName: "Antoria trait - final damage",
          description: "Increases final damage by 18%",
          cooldown: 0,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          maxStacks: 1,
          finalDamageBuffs: [{ value: 0.18 }],
        },
        {
          id: "Antoria trait - volt damage 1 volt weapon",
          displayName: "Antoria trait - volt damage 1 volt weapon",
          description:
            "When equipping Requiem, each Volt weapon grants 5% Volt Damage bonus",
          cooldown: 0,
          requirements: {
            teamRequirements: {
              anyWeapon: ["Antoria"],
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 1 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          maxStacks: 1,
          elementalDamageBuffs: [{ value: 0.05, elementalTypes: ["Volt"] }],
        },
        {
          id: "Antoria trait - volt damage 2 volt weapons",
          displayName: "Antoria trait - volt damage 2 volt weapons",
          description:
            "When equipping Requiem, each Volt weapon grants 5% Volt Damage bonus",
          cooldown: 0,
          requirements: {
            teamRequirements: {
              anyWeapon: ["Antoria"],
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 2 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          maxStacks: 1,
          elementalDamageBuffs: [{ value: 0.1, elementalTypes: ["Volt"] }],
        },
        {
          id: "Antoria trait - volt damage 3 volt weapons",
          displayName: "Antoria trait - volt damage 3 volt weapons",
          description:
            "When equipping Requiem, each Volt weapon grants 5% Volt Damage bonus",
          cooldown: 0,
          requirements: {
            teamRequirements: {
              anyWeapon: ["Antoria"],
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 3 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          maxStacks: 1,
          elementalDamageBuffs: [{ value: 0.15, elementalTypes: ["Volt"] }],
        },
      ],
    },
    Asuka: {
      id: "Asuka",
      displayName: "Asuka",
      buffs: [
        {
          id: "asuka-trait",
          displayName: "Asuka trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    Asurada: {
      id: "Asurada",
      displayName: "Asurada",
      buffs: [],
    },
    Brevey: {
      id: "Brevey",
      displayName: "Brevey",
      buffs: [
        {
          id: "brevey-trait",
          displayName: "Brevey trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "brevey-trait-additional",
          displayName: "Brevey trait additional",
          description:
            "When Pactcrest ☆ Metz is equipped, increase final damage by an additional 6%.",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              anyWeapon: ["Brevey"],
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: {
            combatStart: true,
          },
          cooldown: 0,
        },
      ],
    },
    Claudia: {
      id: "Claudia",
      displayName: "Claudia",
      buffs: [],
    },
    "Claudia Storm Eye": {
      id: "Claudia Storm Eye",
      displayName: "Claudia Storm Eye",
      buffs: [],
    },
    "Cobalt-B": {
      id: "Cobalt-B",
      displayName: "Cobalt-B",
      buffs: [],
      remarks: "Cobalt-B trait will not be implemented",
    },
    Cocoritter: {
      id: "Cocoritter",
      displayName: "Cocoritter",
      buffs: [
        {
          id: "cocoritter-trait",
          displayName: "Cocoritter trait",
          description:
            "Using a support-type weapon's discharge skill or weapon skill, increase nearby allies' (including self) ATK by 15% for 5 seconds.",
          attackPercentBuffs: [
            {
              value: 0.15,
              elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
            },
          ],
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: {
            // endOfSkillOfWeaponType: 'Support',
            // endOfDischargeOfWeaponType: 'Support',
          },
          duration: 5000,
          cooldown: 0,
        },
      ],
    },
    Crow: {
      id: "Crow",
      displayName: "Crow",
      buffs: [
        {
          id: "crow-trait",
          displayName: "Crow trait",
          description: "Increase damage dealt by 10% when not in team play",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        // TODO: verify if this is 10+12% or 10+2%
        {
          id: "crow-trait-combat-start",
          displayName: "Crow trait - entering combat",
          description:
            "Increase damage dealt by 12% for 12 seconds when entering combat",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          duration: 12000,
          cooldown: 0,
        },
      ],
    },
    "Fei Se": {
      id: "Fei Se",
      displayName: "Fei Se",
      buffs: [
        {
          id: "feise-trait-1-flame",
          displayName: "Fei Se trait",
          description:
            "After using Whirling, for every flame weapon equipped, increase final damage by 9% for 30 seconds.",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Flame", numOfWeapons: 1 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: {
            // endOfAttacks: ['feise-skill-whirling'],
          },
          duration: 30000,
          cooldown: 0,
        },
        {
          id: "feise-trait-2-flame",
          displayName: "Fei Se trait",
          description:
            "After using Whirling, for every flame weapon equipped, increase final damage by 9% for 30 seconds.",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Flame", numOfWeapons: 2 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: {
            abilityEnd: ["feise-skill-whirling"],
          },
          duration: 30000,
          cooldown: 0,
        },
        {
          id: "feise-trait-3-flame",
          displayName: "Fei Se trait",
          description:
            "After using Whirling, for every flame weapon equipped, increase final damage by 9% for 30 seconds.",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Flame", numOfWeapons: 3 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: {
            abilityEnd: ["feise-skill-whirling"],
          },
          duration: 30000,
          cooldown: 0,
        },
      ],
    },
    Fenrir: {
      id: "Fenrir",
      displayName: "Fenrir",
      buffs: [
        {
          id: "fenrir-trait-2-elemental-types",
          displayName: "Fenrir trait",
          description:
            "Increase final damage by 18% when equipping 2 weapons of different elements",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              elementalWeapons: { numOfDifferentElementalTypes: 2 },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "fenrir-trait-3-elemental-types",
          displayName: "Fenrir trait",
          description:
            "Increase final damage by 23% when equipping 3 weapons of different elements",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              elementalWeapons: { numOfDifferentElementalTypes: 3 },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    // TODO: Fiona skills are specifically buffed by trait
    Fiona: {
      id: "Fiona",
      displayName: "Fiona",
      buffs: [
        {
          id: "fiona-trait",
          displayName: "Fiona trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    Frigg: {
      id: "Frigg",
      displayName: "Frigg",
      buffs: [
        {
          id: "frigg-trait",
          displayName: "Frigg trait",
          description:
            "Upon entering battle, gain 2.4% frost ATK for 5 seconds every 3 seconds, with up to 10 stacks. Assume max stacks at the start for simplicity",
          attackPercentBuffs: [
            {
              value: 0.24,
              elementalTypes: ["Frost"],
            },
          ],
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
      remarks:
        "For simplicity, Frigg trait is calculated as max stacks at the start of battle, so it will be stronger than it actually is",
    },
    // TODO:
    Gnonno: {
      id: "Gnonno",
      displayName: "Gnonno",
      buffs: [],
    },
    "Gray Fox": {
      id: "Gray Fox",
      displayName: "Gray Fox",
      buffs: [],
    },
    // TODO: crit rate duration buff
    "Huang (Mimi)": {
      id: "Huang (Mimi)",
      displayName: "Huang (Mimi)",
      buffs: [
        {
          id: "mimi-trait",
          displayName: "Mimi trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "mimi-trait-triple-volt",
          displayName: "Mimi trait - Triple volt",
          description:
            "When equipped with 3 volt weapons, increase volt damage by 6%",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 3 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    Huma: {
      id: "Huma",
      displayName: "Huma",
      buffs: [],
    },
    Icarus: {
      id: "Icarus",
      displayName: "Icarus",
      buffs: [
        {
          id: "icarus-trait",
          displayName: "Icarus trait",
          description:
            "After equipping Precious One, increase final damage by 15%",
          maxStacks: 1,
          requirements: { teamRequirements: { anyWeapon: ["Icarus"] } },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    "Ji Yu": {
      id: "Ji Yu",
      displayName: "Ji Yu",
      buffs: [
        {
          id: "jiyu-trait",
          displayName: "Ji Yu trait",
          description: "Increase final damage by 18%.",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "jiyu-trait-flame",
          displayName: "Ji Yu trait - flame",
          description:
            "When Freeflow is equipped, if there is only 1 target in the zone, increase flame damage by 10%. If there are 2 or more targets, increase flame damage to 14%.",
          maxStacks: 1,
          requirements: { teamRequirements: { anyWeapon: ["Ji Yu"] } },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
          remarks: "Assume active at all times for simplicity",
        },
      ],
    },
    King: {
      id: "King",
      displayName: "King",
      buffs: [],
    },
    Lan: {
      id: "Lan",
      displayName: "Lan",
      buffs: [
        {
          id: "lan-trait",
          displayName: "Lan trait",
          description:
            "During Fortitude resonance, final damage is increased by 8%",
          maxStacks: 1,
          requirements: {
            teamRequirements: { weaponResonance: { is: "Fortitude" } },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    // TODO: lin extra skill damage
    Lin: {
      id: "Lin",
      displayName: "Lin",
      buffs: [],
    },
    // TODO: 3 frost extra charge gained; deal passive attack after frost weapon skill or discharge
    "Ling Han": {
      id: "Ling Han",
      displayName: "Ling Han",
      buffs: [
        {
          id: "linghan-trait",
          displayName: "Ling Han trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "linghan-trait-1-frost",
          displayName: "Ling Han trait - 1 frost weapon",
          description:
            "For every frost weapon equipped, increase frost damage by 2.5%",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Frost", numOfWeapons: 1 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "linghan-trait-2-frost",
          displayName: "Ling Han trait - 2 frost weapons",
          description:
            "For every frost weapon equipped, increase frost damage by 2.5%",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
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
          id: "linghan-trait-3-frost",
          displayName: "Ling Han trait - 3 frost weapons",
          description:
            "For every frost weapon equipped, increase frost damage by 2.5%",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Frost", numOfWeapons: 3 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    // TODO: liu huo trait additional effects...
    "Liu Huo": {
      id: "Liu Huo",
      displayName: "Liu Huo",
      buffs: [
        {
          id: "liuhuo-trait",
          displayName: "Liu Huo trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    Lyra: {
      id: "Lyra",
      displayName: "Lyra",
      buffs: [],
    },
    Meryl: {
      id: "Meryl",
      displayName: "Meryl",
      buffs: [],
    },
    "Meryl Ironheart": {
      id: "Meryl Ironheart",
      displayName: "Meryl Ironheart",
      buffs: [],
    },
    "Ming Jing": {
      id: "Ming Jing",
      displayName: "Ming Jing (Zeke)",
      buffs: [
        {
          id: "mingjing-trait",
          displayName: "Ming Jing trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "mingjing-trait-physical-increase",
          displayName: "Ming Jing trait - physical base attack increase",
          description:
            "The Wanderer's base physical ATK is increased to the highest value out of their physical/flame/frost/volt base ATK.",
          miscBuff: {
            increaseElementalBaseAttackToMatchHighest: "Physical",
          },
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "mingjing-trait-normal-attack",
          displayName: "Ming Jing trait - normal attack increase",
          description:
            "When the main slot weapon is Onyx Tortoise, normal attack damage is increased by 50%.",
          maxStacks: 1,
          requirements: { activeWeapon: { is: "Ming Jing" } },
          canBePlayerTriggered: false,
          triggeredBy: { activeWeaponChange: true },
          cooldown: 0,
          // TODO: buff
        },
      ],
    },
    "Nan Yin": {
      id: "Nan Yin",
      displayName: "Nan Yin",
      buffs: [
        {
          id: "nanyin-trait",
          displayName: "Nan Yin trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "nanyin-trait-active-weapon-1-non-altered",
          displayName: "Nan Yin trait - 1 non-altered weapon",
          description:
            "When Purple Bamboo is in the main slot, for every 1 non-altered weapon equipped, increase all elemental damage by 8%",
          maxStacks: 1,
          requirements: {
            activeWeapon: { is: "Nan Yin" },
            teamRequirements: {
              elementalWeapons: {
                numOfNotElementalWeapons: {
                  notElement: "Altered",
                  numOfWeapons: 1,
                },
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { activeWeaponChange: true },
          cooldown: 0,
        },
        {
          id: "nanyin-trait-active-weapon-2-non-altered",
          displayName: "Nan Yin trait - 2 non-altered weapons",
          description:
            "When Purple Bamboo is in the main slot, for every 1 non-altered weapon equipped, increase all elemental damage by 8%",
          maxStacks: 1,
          requirements: {
            activeWeapon: { is: "Nan Yin" },
            teamRequirements: {
              elementalWeapons: {
                numOfNotElementalWeapons: {
                  notElement: "Altered",
                  numOfWeapons: 2,
                },
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { activeWeaponChange: true },
          cooldown: 0,
        },
      ],
    },
    // TODO: attack on electrode summon
    Nemesis: {
      id: "Nemesis",
      displayName: "Nemesis",
      buffs: [],
    },
    "Nemesis Voidpiercer": {
      id: "Nemesis Voidpiercer",
      displayName: "Nemesis Voidpiercer",
      buffs: [],
    },
    Nola: {
      id: "Nola",
      displayName: "Nola",
      buffs: [],
    },
    Plotti: {
      id: "Plotti",
      displayName: "Plotti",
      buffs: [
        {
          id: "plotti-trait",
          displayName: "Plotti trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "plotti-trait-weapon-damage-buff",
          displayName: "Plotti trait - plotti weapon buff",
          description:
            "Increase EP-7000 Skyfire EP-7000 Skyfire's flame damage by 30%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
          // TODO: buff
        },
      ],
    },
    Rei: {
      id: "Rei",
      displayName: "Rei",
      buffs: [
        {
          id: "rei-trait",
          displayName: "Rei trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "rei-trait-attack-resonance",
          displayName: "Rei trait - Attack resonance",
          description:
            "Increase volt damage by 8% when Attack Resonance is activated",
          maxStacks: 1,
          requirements: {
            teamRequirements: { weaponResonance: { is: "Attack" } },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    Roslyn: {
      id: "Roslyn",
      displayName: "Roslyn",
      // TODO:
      buffs: [],
    },
    Rubilia: {
      id: "Rubilia",
      displayName: "Rubilia",
      buffs: [
        {
          id: "rubilia-trait-1-volt",
          displayName: "Rubilia trait - 1 volt weapon",
          description:
            "Increase volt damage by 8% for every 1 volt weapon equipped",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 1 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "rubilia-trait-2-volt",
          displayName: "Rubilia trait - 2 volt weapons",
          description:
            "Increase volt damage by 8% for every 1 volt weapon equipped",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
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
          id: "rubilia-trait-3-volt",
          displayName: "Rubilia trait - 3 volt weapons",
          description:
            "Increase volt damage by 8% for every 1 volt weapon equipped",
          maxStacks: 1,
          requirements: {
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [{ element: "Volt", numOfWeapons: 3 }],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    Ruby: {
      id: "Ruby",
      displayName: "Ruby",
      buffs: [
        {
          id: "ruby-trait-dolly-atk",
          displayName: "Ruby trait - Dolly ATK increase",
          description:
            "Increases flame ATK after throwing Dolly by 12% for 10 seconds",
          attackPercentBuffs: [
            {
              value: 0.12,
              elementalTypes: ["Flame"],
            },
          ],
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { abilityEnd: ["ruby-dodge-go-dolly"] },
          duration: 10000,
          cooldown: 0,
        },
        {
          id: "ruby-trait-dolly-dmg",
          displayName: "Ruby trait - Dolly DMG increase",
          description:
            "Increases the flame damage received by all enemies within 5 meters of Dolly by 8%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { abilityEnd: ["ruby-dodge-go-dolly"] },
          duration: 10000,
          cooldown: 0,
          remarks: "Assumes Dolly remains for 10 seconds and enemy is near it",
        },
      ],
    },
    "Saki Fuwa": {
      id: "Saki Fuwa",
      displayName: "Saki Fuwa",
      buffs: [],
    },
    Samir: {
      id: "Samir",
      displayName: "Samir",
      buffs: [
        {
          id: "samir-trait",
          displayName: "Samir trait",
          description:
            "Grant 1 stack of Concentration every 4 seconds when Samir receives no damage. Each stack increases damage dealt by 4%, and can stack up to 5 times.",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
          remarks:
            "For simplicity, assume max stacks at all times (+20% damage at all times)",
        },
      ],
    },
    Shiro: {
      id: "Shiro",
      displayName: "Shiro",
      buffs: [
        {
          id: "shiro-trait",
          displayName: "Shiro trait",
          description:
            "After using a weapon skill/discharge skill, increase all kinds of ATK by 16% and physical ATK by an additional 10% for 8 seconds. Cooldown: 16 seconds.",
          attackPercentBuffs: [
            {
              value: 0.16,
              elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
            },
            {
              value: 0.1,
              elementalTypes: ["Physical"],
            },
          ],
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: {
            // endOfAnySkillAttack: true,
            // endOfAnyDischargeAttack: true,
          },
          duration: 8000,
          cooldown: 16000,
        },
      ],
    },
    "Tian Lang": {
      id: "Tian Lang",
      displayName: "Tian Lang",
      buffs: [
        {
          id: "tianlang-trait",
          displayName: "Tian Lang trait",
          description:
            "When volt weapon skill and discharge skill are released simultaneously, increase volt damage by 18% for 8 seconds.",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          // TODO: need to check if dual element weapons trigger this
          triggeredBy: {
            // endOfSkillOfElementalType: 'Volt',
            // endOfDischargeOfElementalType: 'Volt',
          },
          duration: 8000,
          cooldown: 0,
          remarks:
            'Assuming the effect activates every volt weapon skill or discharge, ignoring the "simultaneously" requirement',
        },
      ],
    },
    Tsubasa: {
      id: "Tsubasa",
      displayName: "Tsubasa",
      buffs: [
        {
          id: "tsubasa-trait",
          displayName: "Tsubasa trait",
          description:
            "Each time Tsubasa deals damage, gain 1 stack of Fierce Strike, up to 1 stack per 1 second. Each stack adds 0.6% ATK, up to 30 stacks. Refreshes effect duration upon gaining the effect again. The effect lasts for 30 seconds.",
          attackPercentBuffs: [
            {
              value: 0.18,
              elementalTypes: ["Altered", "Flame", "Frost", "Physical", "Volt"],
            },
          ],
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
          remarks: "For simplicity, assume max stacks at all times (+18% ATK)",
        },
      ],
    },
    Umi: {
      id: "Umi",
      displayName: "Umi",
      buffs: [
        {
          id: "umi-trait",
          displayName: "Umi trait",
          description:
            "Increases final damage by 18% for 30 seconds whenever Umi uses It's Magic Time",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: {
            abilityEnd: ["umi-skill-it's-magic-time"],
          },
          duration: 30000,
          cooldown: 0,
        },
      ],
    },
    "Yan Miao": {
      id: "Yan Miao",
      displayName: "Yan Miao",
      buffs: [
        {
          id: "yanmiao-trait",
          displayName: "Yan Miao trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "yanmiao-trait-weapon-buff",
          displayName: "Yan Miao trait - Equilibrium buff",
          // TODO:
          description:
            "When Equilibrium is equipped, increase physical damage dealt to targets with less than 80% of HP by 10%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
          remarks: "This is assumed to be active 80% of the battle duration",
        },
        {
          id: "yanmiao-trait-normal-atk-buff-1-phys",
          displayName: "Yan Miao trait - 1 physical weapon",
          description:
            "For every 1 physical weapon equipped, increase normal attack damage of Equilibrium by 20%, up to 40%.",
          maxStacks: 1,
          requirements: {
            activeWeapon: { is: "Yan Miao" },
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [
                  { element: "Physical", numOfWeapons: 1 },
                ],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { activeWeaponChange: true },
          cooldown: 0,
          // TODO: buff
        },
        {
          id: "yanmiao-trait-normal-atk-buff-2-phys",
          displayName: "Yan Miao trait - 2 physical weapons",
          description:
            "For every 1 physical weapon equipped, increase normal attack damage of Equilibrium by 20%, up to 40%.",
          maxStacks: 1,
          requirements: {
            activeWeapon: { is: "Yan Miao" },
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [
                  { element: "Physical", numOfWeapons: 2 },
                ],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { activeWeaponChange: true },
          cooldown: 0,
          // TODO: buff
        },
        {
          id: "yanmiao-trait-normal-atk-buff-3-phys",
          displayName: "Yan Miao trait - 3 physical weapons",
          description:
            "For every 1 physical weapon equipped, increase normal attack damage of Equilibrium by 20%, up to 40%.",
          maxStacks: 1,
          requirements: {
            activeWeapon: { is: "Yan Miao" },
            teamRequirements: {
              elementalWeapons: {
                numOfElementalWeapons: [
                  { element: "Physical", numOfWeapons: 3 },
                ],
              },
            },
          },
          canBePlayerTriggered: false,
          triggeredBy: { activeWeaponChange: true },
          cooldown: 0,
          // TODO: buff
        },
      ],
    },
    Yanuo: {
      id: "Yanuo",
      displayName: "Yanuo",
      buffs: [
        {
          id: "yanuo-trait",
          displayName: "Yanuo trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
        {
          id: "yanuo-trait-additional",
          displayName: "Yanuo trait - additional",
          description:
            "When equipped with Wicked, increase final damage by an additional 6%",
          maxStacks: 1,
          requirements: { teamRequirements: { anyWeapon: ["Yanuo"] } },
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    // TODO: Yu Lan MA/sweeping forms
    "Yu Lan": {
      id: "Yu Lan",
      displayName: "Yu Lan",
      buffs: [
        {
          id: "yulan-trait",
          displayName: "Yu Lan trait",
          description: "Increase final damage by 18%",
          maxStacks: 1,
          requirements: {},
          canBePlayerTriggered: false,
          triggeredBy: { combatStart: true },
          cooldown: 0,
        },
      ],
    },
    Zero: {
      id: "Zero",
      displayName: "Zero",
      buffs: [],
    },
  },
};
