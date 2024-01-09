import { stateMigrations } from './state-migrations';

export interface StateMigrationsState {
  version: number;
}
export const stateMigrationsStateKey = 'state-migrations';

export function migrateStatesToLatestVersion() {
  const stateMigrationsState = getStateMigrationsState();

  const { version } = stateMigrationsState;
  const latestVersion = stateMigrations[stateMigrations.length - 1].version + 1;

  if (version === latestVersion) {
    return;
  }

  const migration = stateMigrations.find(
    (migration) => migration.version === version
  );

  if (!migration) {
    throw new Error(
      `Could not find migration for version ${version} to ${latestVersion}`
    );
  }

  migration.migrate();
  setStateMigrationsState({ version: version + 1 });

  migrateStatesToLatestVersion();
}

function getStateMigrationsState(): StateMigrationsState {
  return localStorage.getItem(stateMigrationsStateKey)
    ? (JSON.parse(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        localStorage.getItem(stateMigrationsStateKey)!
      ) as StateMigrationsState)
    : { version: 1 };
}

function setStateMigrationsState(stateMigrationsState: StateMigrationsState) {
  localStorage.setItem(
    stateMigrationsStateKey,
    JSON.stringify(stateMigrationsState)
  );
}
