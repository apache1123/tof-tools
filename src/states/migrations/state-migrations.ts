import { initializeChangelogState } from './v1/initialize-changelog-state';
import { migrateTeamsGearSetsStatsToLoadouts } from './v1/migrate-teams-gear-sets-stats-to-loadouts';

export const stateMigrations: StateMigration[] = [
  {
    version: 1,
    migrate: () => {
      migrateTeamsGearSetsStatsToLoadouts();
      initializeChangelogState();
    },
  },
];

interface StateMigration {
  /** Version to migrate from to the next version */
  version: number;
  migrate(): void;
}
