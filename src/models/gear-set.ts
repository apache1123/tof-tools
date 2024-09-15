import { nanoid } from 'nanoid';

import type { CoreElementalType } from '../definitions/elemental-type';
import type { GearName } from '../definitions/gear-types';
import { gearTypesLookup } from '../definitions/gear-types';
import { sum } from '../utils/math-utils';
import type { DataById } from './data';
import type { Dto } from './dto';
import type { GearDto } from './gear';
import { Gear } from './gear';
import type { Persistable } from './persistable';

export class GearSet implements Persistable<GearSetDtoV2> {
  private _id: string;
  private _gearsByTypeId!: DataById<GearName, Gear>;

  public constructor() {
    this._id = nanoid();

    this.resetGears();
  }

  public get id() {
    return this._id;
  }

  public getGearByType(typeId: GearName) {
    return this._gearsByTypeId[typeId];
  }
  public setGear(gear: Gear) {
    this._gearsByTypeId[gear.type.id] = gear;
  }

  public getTotalAttackFlat(elementalType: CoreElementalType): number {
    return sum(
      ...Object.keys(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId as GearName);
        return gear ? gear.getTotalAttackFlat(elementalType) : 0;
      })
    ).toNumber();
  }

  public getTotalAttackPercent(elementalType: CoreElementalType): number {
    return sum(
      ...Object.keys(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId as GearName);
        return gear ? gear.getTotalAttackPercent(elementalType) : 0;
      })
    ).toNumber();
  }

  public getTotalCritFlat(): number {
    return sum(
      ...Object.keys(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId as GearName);
        return gear ? gear.getTotalCritFlat() : 0;
      })
    ).toNumber();
  }

  public getTotalCritPercent(): number {
    return sum(
      ...Object.keys(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId as GearName);
        return gear ? gear.getTotalCritPercent() : 0;
      })
    ).toNumber();
  }

  public getTotalDamagePercent(elementalType: CoreElementalType): number {
    return sum(
      ...Object.keys(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId as GearName);
        return gear ? gear.getTotalElementalDamagePercent(elementalType) : 0;
      })
    ).toNumber();
  }

  // Populate all empty gear
  private resetGears() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._gearsByTypeId = {};
    gearTypesLookup.allIds
      .map((gearTypeId) => gearTypesLookup.byId[gearTypeId])
      .forEach((gearType) => {
        const gear = new Gear(gearType);
        this._gearsByTypeId[gear.type.id] = gear;
      });
  }

  public copyFromDto(dto: GearSetDtoV2): void {
    const { id, gearsByTypeId } = dto;

    this._id = id;

    this.resetGears();
    Object.keys(gearsByTypeId).forEach((typeId) => {
      const gearDto = gearsByTypeId[typeId as GearName];
      const gearType = gearTypesLookup.byId[gearDto.typeId];
      const gear = new Gear(gearType);
      gear.copyFromDto(gearDto);
      this._gearsByTypeId[typeId as GearName] = gear;
    });
  }

  public toDto(): GearSetDtoV2 {
    const { id, _gearsByTypeId } = this;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const gearDtosByTypeId: DataById<GearName, GearDto> = {};
    Object.keys(_gearsByTypeId).forEach((typeId) => {
      const gear = _gearsByTypeId[typeId as GearName];
      const gearDto = gear.toDto();
      gearDtosByTypeId[typeId as GearName] = gearDto;
    });

    return {
      id,
      gearsByTypeId: gearDtosByTypeId,
      version: 2,
    };
  }
}

/** @deprecated Name, ElementalType moved to Loadout */
export interface GearSetDtoV1 extends Dto {
  id: string;
  name: string;
  gearsByTypeId: DataById<GearName, GearDto>;
  elementalType: CoreElementalType | undefined;
  version: 1;
}

export interface GearSetDtoV2 extends Dto {
  id: string;
  gearsByTypeId: DataById<GearName, GearDto>;
  version: 2;
}
