import { initializeChangelogState } from "./v1/initialize-changelog-state";
import { migrateTeamsGearSetsStatsToLoadouts } from "./v1/migrate-teams-gear-sets-stats-to-loadouts";
import { fixGearSetsGearTypeData } from "./v2/fix-gear-sets-gear-type-data";

/** Migrations needed to ensure that the user's data "state" (the serialized DTO data stored in localStorage) is valid with the latest defined schema before it is used in the app.
 *
 * This needs to be done when a DTO has changed in a backwards incompatible way:
 * - adding a new non-optional field
 *   - -> add a new field into the DTO with a default value
 *
 * - renaming a field
 *   - -> copy the field value into a new field, and remove the old field
 *
 * - moved a field from one DTO to another
 *   - -> copy the field value into the new field in the other DTO, and remove the old field
 *
 * - changing a field's data type
 *   - -> update the field value to use the new type
 *
 * - removed a field (not compulsory, but good to clean up data that is no longer used)
 *
 * Migrations can also be used for data-fixes.
 *
 * The latest `version` is one version greater than the version of the last migration defined below */
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
