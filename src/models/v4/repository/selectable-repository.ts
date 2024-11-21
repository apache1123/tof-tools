import type { Id, Identifiable } from "../../identifiable";
import { Repository } from "./repository";

/** A repository that can persist a selected item using an identifier */
export class SelectableRepository<
  T extends Identifiable,
> extends Repository<T> {
  private selectedId: Id | undefined;

  public get selected(): T | undefined {
    return this.selectedId ? this.find(this.selectedId) : undefined;
  }

  public set selected(item: T | undefined) {
    if (item && !this.find(item.id))
      throw new Error("Cannot find item to select");

    this.selectedId = item?.id;
  }
}
