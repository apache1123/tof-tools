export type DataById<T extends string | number, U> = Record<T, U>;
export type DataAllIds<T extends string | number> = T[];
export interface Data<T extends string | number, U> {
  byId: DataById<T, U>;
  allIds: DataAllIds<T>;
}
