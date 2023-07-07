export type DataById<T> = Record<string, T>;
export type DataAllIds = string[];
export interface Data<T> {
  byId: DataById<T>;
  allIds: DataAllIds;
}
