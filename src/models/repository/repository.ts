import type { Identifiable } from "../identifiable";

export class Repository<T extends Identifiable> {
  public constructor() {
    this._items = new Map<string, T>();
  }

  protected _items: Map<string, T>;

  public get items() {
    return [...this._items.values()];
  }

  public find(id: string) {
    return this._items.get(id);
  }

  public add(item: T) {
    this._items.set(item.id, item);
  }

  public remove(id: string) {
    this._items.delete(id);
  }

  public addItems(items: T[]) {
    for (const item of items) {
      this.add(item);
    }
  }

  public clear() {
    this._items.clear();
  }
}
