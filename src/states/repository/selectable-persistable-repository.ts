import type { Dto } from "../../models/dto";
import type { Id, Identifiable } from "../../models/identifiable";
import type { Persistable } from "../../models/persistable";
import type { PersistableRepositoryDto } from "./persistable-repository";
import { PersistableRepository } from "./persistable-repository";

/** A repository that can persist a selected item using an identifier */
export abstract class SelectablePersistableRepository<
    TItem extends Identifiable & Persistable<TItemDto>,
    TItemDto extends Dto,
  >
  extends PersistableRepository<TItem, TItemDto>
  implements Persistable<SelectablePersistableRepositoryDto<TItemDto>>
{
  private selectedId: Id | undefined;

  public get selected(): TItem | undefined {
    return this.selectedId ? this.find(this.selectedId) : undefined;
  }

  public set selected(item: TItem | undefined) {
    if (item && !this.find(item.id))
      throw new Error("Cannot find item to select");

    this.selectedId = item?.id;
  }

  public override copyFromDto(
    dto: SelectablePersistableRepositoryDto<TItemDto>,
  ) {
    super.copyFromDto(dto);

    const { selectedId } = dto;
    this.selected = selectedId ? this.find(selectedId) : undefined;
  }

  public override toDto(): SelectablePersistableRepositoryDto<TItemDto> {
    return {
      ...super.toDto(),
      selectedId: this.selected?.id,
    };
  }
}

export interface SelectablePersistableRepositoryDto<TItemDto extends Dto>
  extends PersistableRepositoryDto<TItemDto> {
  selectedId: string | undefined;
}
