import { dataMigrations } from "./data-migrations";
import {
  getDataMigrationsState,
  setDataMigrationsState,
} from "./data-migrations-state";

export function migrateDataToLatestVersion() {
  const dataMigrationsState = getDataMigrationsState();

  const { version } = dataMigrationsState;
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
  setDataMigrationsState({ version: version + 1 });

  migrateDataToLatestVersion();
}
