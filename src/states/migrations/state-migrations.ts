import { initializeChangelogState } from './v1/initialize-changelog-state';
import { migrateTeamsGearSetsStatsToLoadouts } from './v1/migrate-teams-gear-sets-stats-to-loadouts';
import { fixGearSetsGearTypeData } from './v2/fix-gear-sets-gear-type-data';

export const stateMigrations: StateMigration[] = [
  {
    version: 1,
    migrate: () => {
      migrateTeamsGearSetsStatsToLoadouts();
      initializeChangelogState();
    },
  },
  {
    version: 2,
    migrate: () => {
      fixGearSetsGearTypeData();
    },
  },
];

interface StateMigration {
  /** Version to migrate from to the next version */
  version: number;
  migrate(): void;
}
