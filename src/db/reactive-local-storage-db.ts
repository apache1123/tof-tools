import { proxy } from "valtio";

import type { Identifiable } from "../models/identifiable";
import type { Db, RepositoryKey, RepositoryMap } from "./db";
import { CharacterRepository } from "./repositories/character/character-repository";
import { GearRepository } from "./repositories/gear/gear-repository";
import { GearSetPresetRepository } from "./repositories/gear/gear-set-preset-repository";
import { GearSetRepository } from "./repositories/gear/gear-set-repository";
import { MatrixRepository } from "./repositories/matrix/matrix-repository";
import { WeaponRepository } from "./repositories/weapon/weapon-repository";
import { StubRepository } from "./repository/stub-repository";
import type { ReactiveRepository } from "./repository/types/reactive-repository";

export class ReactiveLocalStorageDb implements Db {
  // Need to initialize stub repositories first to avoid errors during SSR
  private readonly repositories: Record<
    RepositoryKey,
    ReactiveRepository<Identifiable>
  > = proxy({
    characters: new StubRepository(),
    gears: new StubRepository(),
    gearSets: new StubRepository(),
    gearSetPresets: new StubRepository(),
    matrices: new StubRepository(),
    weapons: new StubRepository(),
  });

  /** Initializes the repositories in the given order.
   * There are several caveats to this implementation at the moment, however -
   * - This will throw if we try to initialize a repository that depends on another repository that has not been initialized yet. In which case try to reverse the order of initialization.
   * - This also implicitly means that there cannot be circular dependencies between repositories.
   * - By default, the repositories are initialized as a stub repository to not cause errors during SSR. This means that this init needs to be called when it is guaranteed that the code is running in the browser (e.g. in a `useEffect` hook, or any-time after initial load) to ensure the repositories are properly initialized with user data
   *
   * This can be improved in the future, but eh it will do for now, and errors should be caught in development */
  public init<T extends RepositoryKey>(keys: T[]): void {
    for (const key of keys) {
      const existing = this.get(key);
      if (existing.type !== "stub") continue;

      const repository = this.createRepository(key);

      repository.load();
      repository.subscribeToChanges();

      this.repositories[key] = repository;
    }
  }

  public get<T extends RepositoryKey>(key: T): RepositoryMap[T] {
    return this.repositories[key] as unknown as RepositoryMap[T];
  }

  private createRepository<T extends RepositoryKey>(
    key: T,
  ): ReactiveRepository<Identifiable> {
    const storage = localStorage;

    switch (key) {
      case "characters":
        return new CharacterRepository(key, storage, this);
      case "gears":
        return new GearRepository(key, storage, this);
      case "gearSets":
        return new GearSetRepository(key, storage, this);
      case "gearSetPresets":
        return new GearSetPresetRepository(key, storage, this);
      case "matrices":
        return new MatrixRepository(key, storage, this);
      case "weapons":
        return new WeaponRepository(key, storage, this);
      default:
        throw new Error(`Unknown repository key: ${key}`);
    }
  }
}

export const db: Db = new ReactiveLocalStorageDb();
