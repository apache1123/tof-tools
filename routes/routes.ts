export interface Route {
  label: string;
  path: string;
}

export const routes = {
  damageCalculator: {
    label: 'Damage Calculator',
    path: '/damage-calculator',
  },
  simulatorResults: {
    label: 'Simulator Results',
    path: '/simulator-results',
  },
  loadouts: {
    label: 'Loadouts',
    path: '/loadouts',
  },
  gearComparer: {
    label: 'Compare Gear',
    path: '/gear-comparer',
  },
  stats: {
    label: 'Stats stuff',
    path: '/stats',
  },
  settings: {
    label: 'Settings',
    path: '/settings',
  },
  links: {
    label: 'Useful Links',
    path: '/links',
  },
} as const satisfies Record<string, Route>;
