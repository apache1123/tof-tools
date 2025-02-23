import type { Id, Identifiable } from "../../../models/identifiable";

export interface Repository<T extends Identifiable> {
  type: "stub" | "valtio";

  items: T[];
  find(id: Id): T | undefined;
  filter(predicate: (item: T) => boolean): T[];
  add(item: T): void;
  addItems(items: T[]): void;
  remove(id: Id): void;
  // Note: There is no `update` method in this as the only db implementation right now automatically updates the items on change

  /** Saves the repository to storage. */
  save(): void;
  /** Loads the repository from storage. */
  load(): void;
}
