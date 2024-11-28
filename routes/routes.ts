export interface Route {
  label: string;
  path: string;
}

export const routes = {
  gears: {
    label: "Gears",
    path: "/gears",
  },
  weapons: {
    label: "Weapons",
    path: "/weapons",
  },
  damageCalculator: {
    label: "Damage Calculator",
    path: "/damage-calculator",
  },
  simulatorResults: {
    label: "Simulator Results",
    path: "/simulator-results",
  },
  loadouts: {
    label: "Loadouts",
    path: "/loadouts",
  },
  gearComparer: {
    label: "Compare Gear",
    path: "/gear-comparer",
  },
  stats: {
    label: "Stats",
    path: "/stats",
  },
  settings: {
    label: "Settings",
    path: "/settings",
  },
  links: {
    label: "Useful Links",
    path: "/links",
  },
} as const satisfies Record<string, Route>;
