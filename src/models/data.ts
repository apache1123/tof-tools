export type DataById<T extends string, U> = Record<T, U>;
export type DataAllIds<T extends string> = T[];
export interface Data<T extends string, U> {
  byId: DataById<T, U>;
  allIds: DataAllIds<T>;
}
