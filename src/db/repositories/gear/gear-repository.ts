import { getGearType } from "../../../definitions/gear-types";
import { getStatType } from "../../../definitions/stat-types";
import { Gear } from "../../../models/gear/gear";
import { RandomStat } from "../../../models/gear/random-stat";
import { DeserializationError } from "../../error/deserialization-error";
import { ValtioRepository } from "../../repository/valtio-repository";
import type { GearDtoV2 } from "./gear-dto";
import type { RandomStatDto } from "./random-stat-dto";

export class GearRepository extends ValtioRepository<Gear, GearDtoV2> {
  protected override itemToDto(item: Gear): GearDtoV2 {
    const {
      id,
      characterId,
      type,
      stars,
      randomStats,
      augmentStats,
      isAugmented,
    } = item;

    return {
      id,
      characterId,
      typeId: type.id,
      stars,
      randomStats: randomStats.map((randomStat) =>
        randomStat ? mapToDto(randomStat) : undefined,
      ),
      augmentStats: augmentStats.map((augmentStat) =>
        augmentStat ? mapToDto(augmentStat) : undefined,
      ),
      isAugmented,
      version: 2,
    };

    function mapToDto(stat: RandomStat): RandomStatDto {
      const { type, value, augmentIncreaseValue } = stat;
      return {
        typeId: type.id,
        value,
        augmentIncreaseValue,
        version: 1,
      };
    }
  }
  protected override dtoToItem(dto: GearDtoV2): Gear {
    const {
      id,
      typeId,
      characterId,
      stars,
      randomStats: randomStatDtos,
      augmentStats: augmentStatDtos,
      isAugmented,
    } = dto;

    const character = this.db.get("characters").find(characterId);
    if (!character)
      throw new DeserializationError(
        `Character with Id ${characterId} not found when creating gear`,
        dto,
      );

    const gear = new Gear(getGearType(typeId), character, id);
    gear.stars = stars;
    gear.isAugmented = !!isAugmented;

    randomStatDtos.forEach((randomStatDto, i) => {
      if (randomStatDto) {
        const randomStat = createStat(randomStatDto);
        gear.setRandomStat(i, randomStat);
      }
    });

    augmentStatDtos?.forEach((augmentStatDto, i) => {
      if (augmentStatDto) {
        const augmentStat = createStat(augmentStatDto);
        gear.setAugmentStat(i, augmentStat);
      }
    });

    return gear;

    function createStat(randomStatDto: RandomStatDto) {
      const { typeId, value, augmentIncreaseValue } = randomStatDto;

      const randomStat = new RandomStat(getStatType(typeId));
      randomStat.value = value;
      randomStat.augmentIncreaseValue = augmentIncreaseValue ?? 0;
      return randomStat;
    }
  }
}
