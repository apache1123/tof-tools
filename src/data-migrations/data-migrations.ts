import { initializeChangelogState } from "./v1/initialize-changelog-state";
import { migrateTeamsGearSetsStatsToLoadouts } from "./v1/migrate-teams-gear-sets-stats-to-loadouts";
import { fixGearSetsGearTypeData } from "./v2/fix-gear-sets-gear-type-data";
import { migrateToRepos } from "./v3/migrateToRepos";
import { resetChangelogState } from "./v3/resetChangelogState";
import { fixMissingTeamPresetsInCharacterPresets } from "./v4/fix-missing-team-presets-in-character-presets";
import { fixOutOfRangeGearRandomStats } from "./v5/fix-out-of-range-gear-random-stats";

/** Migrations needed to ensure that the user's data (the serialized DTO data stored in localStorage) is valid with the latest defined schema before it is used in the app.
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
 * The latest `version` is one version greater than the version of the last migration defined below.
 *
 * The `version` used here is purely for data migrations, and is not related to the version of the app. */
export const dataMigrations: DataMigration[] = [
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
  {
    version: 3,
    migrate: () => {
      migrateToRepos();
      resetChangelogState();
    },
  },
  {
    version: 4,
    migrate: () => {
      fixMissingTeamPresetsInCharacterPresets();
    },
  },
  {
    version: 5,
    migrate: () => {
      fixOutOfRangeGearRandomStats();
    },
  },
];

interface DataMigration {
  /** Version to migrate from to the next version */
  version: number;
  migrate(): void;
}
