import { persistenceKeyPrefix } from "../constants/persistence";

export interface DataMigrationRecord {
  /** The current version of data (db) */
  version: number;
}
export const dataMigrationRecordKey = `${persistenceKeyPrefix}data-migration-record`;

/** @deprecated Old key name before renaming to current key, used prior to v4 app */
export const legacyDataMigrationRecordKey = "state-migrations";

export function getDataMigrationRecord(): DataMigrationRecord {
  // Fallback to reading from legacy key name, if it exists, else default to version 1
  return localStorage.getItem(dataMigrationRecordKey)
    ? (JSON.parse(
        localStorage.getItem(dataMigrationRecordKey)!,
      ) as DataMigrationRecord)
    : localStorage.getItem(legacyDataMigrationRecordKey)
      ? (JSON.parse(
          localStorage.getItem(legacyDataMigrationRecordKey)!,
        ) as DataMigrationRecord)
      : { version: 1 };
}

export function setDataMigrationRecord(migrationRecord: DataMigrationRecord) {
  localStorage.setItem(dataMigrationRecordKey, JSON.stringify(migrationRecord));
}
