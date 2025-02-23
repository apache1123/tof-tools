import {
  getDataMigrationRecord,
  setDataMigrationRecord,
} from "./data-migration-record";
import { dataMigrations } from "./data-migrations";

export function migrateDataToLatestVersion() {
  const dataMigrationRecord = getDataMigrationRecord();

  const { version } = dataMigrationRecord;
  const latestVersion = dataMigrations[dataMigrations.length - 1].version + 1;

  if (version === latestVersion) {
    return;
  }

  const migration = dataMigrations.find(
    (migration) => migration.version === version,
  );

  if (!migration) {
    throw new Error(
      `Could not find migration for version ${version} to ${latestVersion}`,
    );
  }

  migration.migrate();
  setDataMigrationRecord({ version: version + 1 });

  migrateDataToLatestVersion();
}
