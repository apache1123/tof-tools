export interface Versioned {
  version: number;
}

export interface Migration {
  /** Version to migrate from to the next version */
  version: number;
  migrate(dto: Versioned): Versioned;
}

/** Versioned migrations, in order */
export type Migrations = Migration[];

export function migrateToLatestVersion<T extends Versioned>(
  dto: Versioned,
  migrations: Migrations
): T {
  const version = dto.version ?? 1; // Default to version 1, for DTOs that don't have a version yet
  const latestVersion = migrations[migrations.length - 1].version + 1;

  if (version === latestVersion) {
    return dto as unknown as T;
  }

  const migration = migrations.find(
    (migration) => migration.version === version
  );

  if (!migration) {
    throw new Error(
      `Could not find migration for version ${version} to ${latestVersion}`
    );
  }

  return migrateToLatestVersion(migration.migrate(dto), migrations);
}
