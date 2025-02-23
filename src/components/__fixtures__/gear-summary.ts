import type { GearSummary } from "../../models/gear/gear-summary";

export const exampleGearSummary: GearSummary = {
  element: {
    Altered: {
      attackFlat: {
        role: "Attack",
        element: "Altered",
        displayName: "ATK",
        value: 0,
        isPercentageBased: false,
      },
      attackPercent: {
        role: "Attack %",
        element: "Altered",
        displayName: "ATK",
        value: 0.01,
        isPercentageBased: true,
      },
      damagePercent: {
        role: "Damage %",
        element: "Altered",
        displayName: "DMG",
        value: 0,
        isPercentageBased: true,
      },
    },
    Flame: {
      attackFlat: {
        role: "Attack",
        element: "Flame",
        displayName: "ATK",
        value: 1000,
        isPercentageBased: false,
      },
      attackPercent: {
        role: "Attack %",
        element: "Flame",
        displayName: "ATK",
        value: 0.05,
        isPercentageBased: true,
      },
      damagePercent: {
        role: "Damage %",
        element: "Flame",
        displayName: "DMG",
        value: 0.06,
        isPercentageBased: true,
      },
    },
    Frost: {
      attackFlat: {
        role: "Attack",
        element: "Frost",
        displayName: "ATK",
        value: 200,
        isPercentageBased: false,
      },
      attackPercent: {
        role: "Attack %",
        element: "Frost",
        displayName: "ATK",
        value: 0.02,
        isPercentageBased: true,
      },
      damagePercent: {
        role: "Damage %",
        element: "Frost",
        displayName: "DMG",
        value: 0,
        isPercentageBased: true,
      },
    },
    Physical: {
      attackFlat: {
        role: "Attack",
        element: "Physical",
        displayName: "ATK",
        value: 1030,
        isPercentageBased: false,
      },
      attackPercent: {
        role: "Attack %",
        element: "Physical",
        displayName: "ATK",
        value: 0.11,
        isPercentageBased: true,
      },
      damagePercent: {
        role: "Damage %",
        element: "Physical",
        displayName: "DMG",
        value: 0,
        isPercentageBased: true,
      },
    },
    Volt: {
      attackFlat: {
        role: "Attack",
        element: "Volt",
        displayName: "ATK",
        value: 0,
        isPercentageBased: false,
      },
      attackPercent: {
        role: "Attack %",
        element: "Volt",
        displayName: "ATK",
        value: 0.01,
        isPercentageBased: true,
      },
      damagePercent: {
        role: "Damage %",
        element: "Volt",
        displayName: "DMG",
        value: 0,
        isPercentageBased: true,
      },
    },
  },
  critFlat: {
    role: "Crit",
    element: "All",
    displayName: "Crit",
    value: 4040,
    isPercentageBased: false,
  },
  critPercent: {
    role: "Crit %",
    element: "All",
    displayName: "Crit",
    value: 0.05,
    isPercentageBased: true,
  },
};
