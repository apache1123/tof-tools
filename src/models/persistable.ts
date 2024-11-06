import type { Dto } from "./dto";

export interface Persistable<T extends Dto> extends Serializable<T> {
  copyFromDto(dto: T): void;
}

export interface Serializable<T extends Dto> {
  toDto(): T;
}
