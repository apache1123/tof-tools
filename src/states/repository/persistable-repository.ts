import { proxyMap } from "valtio/utils";

import type { Dto } from "../../models/dto";
import type { Identifiable } from "../../models/identifiable";
import type { Persistable } from "../../models/persistable";
import { Repository } from "../../models/repository/repository";

export abstract class PersistableRepository<
    TItem extends Identifiable & Persistable<TItemDto>,
    TItemDto extends Dto,
  >
  extends Repository<TItem>
  implements Persistable<PersistableRepositoryDto<TItemDto>>
{
  public constructor() {
    super();
    this._items = proxyMap();
  }

  public copyFromDto(dto: PersistableRepositoryDto<TItemDto>): void {
    this.clear();
    this.addItems(
      dto.items.map((item) => {
        const newItem = this.createItemFromDto(item);
        newItem.copyFromDto(item);
        return newItem;
      }),
    );
  }

  public toDto(): PersistableRepositoryDto<TItemDto> {
    return {
      items: this.items.map((item) => item.toDto()),
      version: 1,
    };
  }

  /** The inheriting class has to define how to create an item from the dto. Does not necessarily need to copy all properties from the dto over, just how to "new" an item. */
  protected abstract createItemFromDto(itemDto: TItemDto): TItem;
}

export interface PersistableRepositoryDto<TItemDto extends Dto> extends Dto {
  items: TItemDto[];
  version: 1;
}
