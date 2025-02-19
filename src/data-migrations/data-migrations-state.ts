export interface DataMigrationsState {
  version: number;
}
export const dataMigrationsStateKey = "state-migrations";

export function getDataMigrationsState(): DataMigrationsState {
  return localStorage.getItem(dataMigrationsStateKey)
    ? (JSON.parse(
        localStorage.getItem(dataMigrationsStateKey)!,
      ) as DataMigrationsState)
    : { version: 1 };
}

export function setDataMigrationsState(
  dataMigrationsState: DataMigrationsState,
) {
  localStorage.setItem(
    dataMigrationsStateKey,
    JSON.stringify(dataMigrationsState),
  );
}
