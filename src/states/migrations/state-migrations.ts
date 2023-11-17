import { migrateTeamsGearSetsStatsToLoadouts } from './migrate-teams-gear-sets-stats-to-loadouts';

export const stateMigrations: StateMigration[] = [
  {
    version: 1,
    migrate: () => {
      migrateTeamsGearSetsStatsToLoadouts();
    },
  },
];

interface StateMigration {
  /** Version to migrate from to the next version */
  version: number;
  migrate(): void;
}
