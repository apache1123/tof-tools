import type { BuffSummary } from "../../models/buff-summary/buff-summary";

export const exampleBuffSummary: BuffSummary = {
  element: "Flame",
  baseAttackBuffs: {
    items: [
      {
        id: "base-attack-buff-1",
        displayName: "Base attack buff 1",
        totalValue: 100,
        stacks: 1,
      },
    ],
    totalValue: 100,
  },
  attackPercentBuffs: {
    items: [
      {
        id: "attack-percent-buff-1",
        displayName: "Attack percent buff 1",
        totalValue: 0.12,
        stacks: 1,
      },
      {
        id: "attack-percent-buff-1",
        displayName: "Attack percent buff 2",
        totalValue: 0.23,
        stacks: 1,
      },
    ],
    totalValue: 0.35,
  },
  elementalDamageBuffs: {
    items: [],
    totalValue: 0,
  },
  finalDamageBuffs: {
    items: [
      {
        id: "final-damage-buff-1",
        displayName: "Final damage buff 1",
        totalValue: 0.005,
        stacks: 1,
      },
      {
        id: "final-damage-buff-2",
        displayName: "Final damage buff 2",
        totalValue: 0.1,
        stacks: 1,
      },
      {
        id: "final-damage-buff-3",
        displayName: "Final damage buff 3",
        totalValue: 0.014,
        stacks: 1,
      },
    ],
    totalValue: 0.119,
  },
  critRateBuffs: {
    items: [
      {
        id: "crit-rate-buff-1",
        displayName: "Crit rate buff 1",
        totalValue: 0.2,
        stacks: 1,
      },
    ],
    totalValue: 0.2,
  },
  critDamageBuffs: {
    items: [
      {
        id: "crit-damage-buff-1",
        displayName: "Crit damage buff 1",
        totalValue: 0.2,
        stacks: 1,
      },
    ],
    totalValue: 0.2,
  },
};
