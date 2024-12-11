import { nanoid } from "nanoid";

import type { GearDtoV1 } from "../../db/repositories/gear/deprecated/dto";
import type { GearDtoV2 } from "../../db/repositories/gear/gear-dto";
import type { Dto } from "../../db/repository/dto";
import type {
  CoreElementalType,
  WeaponElementalType,
} from "../../definitions/elemental-type";
import type { GearTypeId } from "../../definitions/gear-types";
import { gearTypesLookup } from "../../definitions/gear-types";
import { sum } from "../../utils/math-utils";
import { keysOf } from "../../utils/object-utils";
import type { CharacterId } from "../character/character";
import type { DataById } from "../data";
import { Gear } from "../gear/gear";

export class GearSet {
  public constructor(
    gears: DataById<GearTypeId, Gear>,
    characterId: CharacterId,
  ) {
    this._id = nanoid();
    this.characterId = characterId;
    this._gearsByTypeId = gears;
  }

  public readonly characterId: CharacterId;
  private readonly _id: string;
  private readonly _gearsByTypeId: DataById<GearTypeId, Gear>;

  public get id() {
    return this._id;
  }

  /** Creates an empty GearSet */
  public static create(characterId: CharacterId): GearSet {
    return new GearSet(
      {
        Helmet: new Gear(gearTypesLookup.byId.Helmet, characterId),
        Eyepiece: new Gear(gearTypesLookup.byId.Eyepiece, characterId),
        Spaulders: new Gear(gearTypesLookup.byId.Spaulders, characterId),
        Gloves: new Gear(gearTypesLookup.byId.Gloves, characterId),
        Bracers: new Gear(gearTypesLookup.byId.Bracers, characterId),
        Armor: new Gear(gearTypesLookup.byId.Armor, characterId),
        "Combat Engine": new Gear(
          gearTypesLookup.byId["Combat Engine"],
          characterId,
        ),
        Belt: new Gear(gearTypesLookup.byId.Belt, characterId),
        Legguards: new Gear(gearTypesLookup.byId.Legguards, characterId),
        Boots: new Gear(gearTypesLookup.byId.Boots, characterId),
        Exoskeleton: new Gear(gearTypesLookup.byId.Exoskeleton, characterId),
        Microreactor: new Gear(gearTypesLookup.byId.Microreactor, characterId),
      },
      characterId,
    );
  }

  public static createCopy(gearSet: GearSet): GearSet {
    return new GearSet(
      {
        Helmet: gearSet.getGearByType("Helmet"),
        Eyepiece: gearSet.getGearByType("Eyepiece"),
        Spaulders: gearSet.getGearByType("Spaulders"),
        Gloves: gearSet.getGearByType("Gloves"),
        Bracers: gearSet.getGearByType("Bracers"),
        Armor: gearSet.getGearByType("Armor"),
        "Combat Engine": gearSet.getGearByType("Combat Engine"),
        Belt: gearSet.getGearByType("Belt"),
        Legguards: gearSet.getGearByType("Legguards"),
        Boots: gearSet.getGearByType("Boots"),
        Exoskeleton: gearSet.getGearByType("Exoskeleton"),
        Microreactor: gearSet.getGearByType("Microreactor"),
      },
      gearSet.characterId,
    );
  }

  public getGearByType(typeId: GearTypeId) {
    return this._gearsByTypeId[typeId];
  }

  public setGear(gear: Gear) {
    this._gearsByTypeId[gear.type.id] = gear;
  }

  public getTotalAttackFlat(element: WeaponElementalType): number {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalAttackFlat(element),
    );
  }

  public getTotalAttackPercent(element: WeaponElementalType): number {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalAttackPercent(element),
    );
  }

  public getTotalDamagePercent(element: WeaponElementalType): number {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalElementalDamagePercent(element),
    );
  }

  /** Sum of all gears' crit rate flat stats */
  public getTotalCritRateFlat(): number {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalCritFlat(),
    );
  }

  /** Sum of all gears' crit rate % stat. Does not include converted crit rate flat stats */
  public getTotalCritRatePercent(): number {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalCritPercent(),
    );
  }

  public getTotalHpFlat() {
    return this.additiveSumStatValueOfAllGears((gear) => gear.getTotalHpFlat());
  }

  public getTotalHpPercent() {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalHpPercent(),
    );
  }

  public getTotalResistanceFlat(element: WeaponElementalType) {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalResistanceFlat(element),
    );
  }

  public getTotalResistancePercent(element: WeaponElementalType) {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalResistancePercent(element),
    );
  }

  // public copyFromDto(dto: GearSetDtoV3): void {
  //   const { id, characterId, gearsByTypeId } = dto;
  //
  //   this._id = id;
  //   this._characterId = characterId;
  //
  //   keysOf(gearsByTypeId).forEach((typeId) => {
  //     const gearDto = gearsByTypeId[typeId];
  //     const gearType = gearTypesLookup.byId[gearDto.typeId];
  //     const gear = new Gear(gearType, characterId);
  //     gear.copyFromDto(gearDto);
  //     this._gearsByTypeId[typeId] = gear;
  //   });
  // }
  //
  // public toDto(): GearSetDtoV3 {
  //   const { id, characterId, _gearsByTypeId } = this;
  //
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   const gearDtosByTypeId: DataById<GearName, GearDtoV2> = {};
  //   keysOf(_gearsByTypeId).forEach((typeId) => {
  //     const gear = _gearsByTypeId[typeId];
  //     gearDtosByTypeId[typeId] = gear.toDto();
  //   });
  //
  //   return {
  //     id,
  //     characterId,
  //     gearsByTypeId: gearDtosByTypeId,
  //     version: 3,
  //   };
  // }

  private additiveSumStatValueOfAllGears(
    statSelector: (gear: Gear) => number,
  ): number {
    return sum(
      ...keysOf(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId);
        return gear ? statSelector(gear) : 0;
      }),
    ).toNumber();
  }
}

export interface GearSetDtoV3 extends Dto {
  id: string;
  characterId: string;
  gearsByTypeId: DataById<GearTypeId, GearDtoV2>;
  version: 3;
}

/** @deprecated Introduced Character. Gear set must belong to a Character now */
export interface GearSetDtoV2 extends Dto {
  id: string;
  gearsByTypeId: DataById<GearTypeId, GearDtoV1>;
  version: 2;
}

/** @deprecated Name, ElementalType moved to Loadout */
export interface GearSetDtoV1 extends Dto {
  id: string;
  name: string;
  gearsByTypeId: DataById<GearTypeId, GearDtoV1>;
  elementalType: CoreElementalType | undefined;
  version: 1;
}
