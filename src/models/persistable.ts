import type { Dto } from "../db/repository/dto";

export interface Serializable<T extends Dto> {
  toDto(): T;
}
