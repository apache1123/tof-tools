import { gearTypesLookup } from "../../definitions/gear-types";
import type { GearDtoV2 } from "../../models/gear/gear";
import { Gear } from "../../models/gear/gear";
import type { Persistable } from "../../models/persistable";
import type { CharactersState } from "../characters/characters-state";
import type { PersistableRepositoryDto } from "../repository/persistable-repository";
import { PersistableRepository } from "../repository/persistable-repository";
import type { GearFilter } from "./gear-filter";

export class GearsState
  extends PersistableRepository<Gear, GearDtoV2>
  implements Persistable<GearsStateDto>
{
  public constructor(private readonly charactersState: CharactersState) {
    super();

    this.filter = {
      gearNames: [],
    };
  }

  public filter: GearFilter;

  public getCurrentCharacterGears(): Gear[] {
    return this.items.filter(
      (gear) => gear.characterId === this.charactersState.selected?.id,
    );
  }

  public displayedGears(): Gear[] {
    return this.getCurrentCharacterGears().filter((gear) => {
      const { gearNames } = this.filter;
      if (gearNames.length) {
        return gearNames.includes(gear.type.id);
      }

      return true;
    });
  }

  public resetFilter() {
    this.filter = {
      gearNames: [],
    };
  }

  public override copyFromDto(dto: GearsStateDto) {
    super.copyFromDto(dto);
    this.filter = dto.filter;
  }

  public override toDto(): GearsStateDto {
    return { ...super.toDto(), filter: this.filter };
  }

  protected override createItemFromDto(itemDto: GearDtoV2): Gear {
    const { typeId, characterId } = itemDto;
    return new Gear(gearTypesLookup.byId[typeId], characterId);
  }
}

export interface GearsStateDto extends PersistableRepositoryDto<GearDtoV2> {
  filter: GearFilter;
}
