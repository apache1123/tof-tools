import type { Identifiable } from "../../models/identifiable";
import type { ReactiveRepository } from "./types/reactive-repository";

/** For use when running in nextjs SSR */
export class StubRepository<T extends Identifiable>
  implements ReactiveRepository<T>
{
  public type = "stub" as const;
  public items: T[] = [];

  public find(): T | undefined {
    return undefined;
  }

  public filter(): T[] {
    return [];
  }

  public add(): void {}

  public addItems(): void {}

  public remove(): void {}

  public save(): void {}

  public load(): void {}

  public subscribeToChanges(): void {}

  public unsubscribeToChanges(): void {}
}
