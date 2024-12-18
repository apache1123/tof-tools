import { proxy, ref, subscribe } from "valtio";
import { proxyMap } from "valtio/utils";

import { repositoryKeyPrefix } from "../../constants/persistence";
import type { Id, Identifiable } from "../../models/identifiable";
import { logException } from "../../utils/exception-utils";
import type { Db } from "../db";
import type { DbStorage } from "../storage/db-storage";
import type { Dto } from "./dto";
import type { ReactiveRepository } from "./types/reactive-repository";

/** Repository that utilizes valtio to react to and persist changes. */
export abstract class ValtioRepository<
  TItem extends Identifiable,
  TItemDto extends Dto,
> implements ReactiveRepository<TItem>
{
  public constructor(key: string, storage: DbStorage, db: Db) {
    this.storage = ref(storage);
    this.key = key;
    this.db = db;
    this._items = proxyMap();
  }

  public type = "valtio" as const;

  public get items() {
    return proxy([...this._items.values()]);
  }

  public find(id: Id) {
    return this._items.get(id);
  }

  public filter(predicate: (item: TItem) => boolean): TItem[] {
    return proxy(this.items.filter(predicate));
  }

  public add(item: TItem) {
    this._items.set(item.id, item);
  }

  public addItems(items: TItem[]) {
    for (const item of items) {
      this.add(item);
    }
  }

  public remove(id: Id) {
    this._items.delete(id);
  }

  public save(): void {
    this.storage.setItem(
      this.persistenceKey,
      JSON.stringify(this.items.map(this.itemToDto)),
    );
  }

  public load(): void {
    const data = this.storage.getItem(this.persistenceKey);
    if (data) {
      const dtos = JSON.parse(data) as TItemDto[];

      for (const dto of dtos) {
        try {
          this.add(this.dtoToItem(dto));
        } catch (error) {
          logException(error);
        }
      }
    }
  }

  protected readonly db: Db;
  private readonly key: string;
  private readonly storage: DbStorage;
  private readonly _items: Map<string, TItem>;
  private _unsubscribe: (() => void) | undefined;

  private get persistenceKey() {
    return `${repositoryKeyPrefix}${this.key}`;
  }

  public subscribeToChanges(): void {
    this._unsubscribe = subscribe(this._items, () => {
      this.save();
    });
  }

  public unsubscribeToChanges(): void {
    this._unsubscribe?.();
  }

  protected abstract itemToDto(item: TItem): TItemDto;

  protected abstract dtoToItem(dto: TItemDto): TItem;
}
