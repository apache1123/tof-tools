import type { Dto } from './dto';

export interface Persistable<T extends Dto> {
  copyFromDto(dto: T): void;
  toDto(): T;
}
