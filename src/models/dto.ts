export interface Dto {
  version: number;
}

export interface DtoMigration {
  /** Version to migrate from to the next version */
  version: number;
  migrate(dto: Dto): Dto;
}

/** Versioned migrations, in order */
export type DtoMigrations = DtoMigration[];

export function migrateDtoToLatestVersion<T extends Dto>(
  dto: Dto,
  migrations: DtoMigrations
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

  return migrateDtoToLatestVersion(migration.migrate(dto), migrations);
}
