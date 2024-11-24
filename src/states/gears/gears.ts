import { gearTypesLookup } from "../../definitions/gear-types";
import type { GearDtoV2 } from "../../models/gear/gear";
import { Gear } from "../../models/gear/gear";
import type { CharactersState } from "../characters/characters";
import { PersistableRepository } from "../repository/persistable-repository";

export class GearsState extends PersistableRepository<Gear, GearDtoV2> {
  public constructor(
    items: Gear[],
    private readonly charactersState: CharactersState,
  ) {
    super(items);
  }

  public getCurrentCharacterGears(): Gear[] {
    return this.items.filter(
      (gear) => gear.characterId === this.charactersState.selected?.id,
    );
  }

  protected override createItemFromDto(itemDto: GearDtoV2): Gear {
    const { typeId, characterId } = itemDto;
    return new Gear(gearTypesLookup.byId[typeId], characterId);
  }
}
