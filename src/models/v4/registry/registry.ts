export class Registry<T extends { id: string }> {
  private readonly _items = new Map<string, T>();

  public constructor(items: T[]) {
    for (const item of items) {
      this.add(item);
    }
  }

  public get items() {
    return [...this._items.values()];
  }

  public find(id: string) {
    return this._items.get(id);
  }

  public add(item: T) {
    this._items.set(item.id, item);
  }
}
