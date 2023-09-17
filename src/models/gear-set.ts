import { nanoid } from 'nanoid';

import type { CoreElementalType } from '../constants/elemental-type';
import type { GearName } from '../constants/gear-types';
import { gearTypesLookup } from '../constants/gear-types';
import { additiveSum } from '../utils/math-utils';
import type { DataById } from './data';
import type { GearDTO } from './gear';
import { Gear } from './gear';
import type { Persistable } from './persistable';

export class GearSet implements Persistable<GearSetDTO> {
  private _id: string;
  private _gearsByTypeId!: DataById<GearName, Gear>;

  public name: string;
  public elementalType: CoreElementalType | undefined;

  public constructor(name: string) {
    this._id = nanoid();
    this.name = name;
    this.elementalType = undefined;

    this.resetGears();
  }

  public get id() {
    return this._id;
  }

  public getGearByType(typeId: GearName) {
    return this._gearsByTypeId[typeId];
  }

  public getTotalAttackFlat(): number {
    if (!this.elementalType) return 0;

    return additiveSum(
      Object.keys(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId as GearName);
        return gear && this.elementalType
          ? gear.getTotalAttackFlat(this.elementalType)
          : 0;
      })
    ).toNumber();
  }

  public getTotalAttackPercent(): number {
    if (!this.elementalType) return 0;

    return additiveSum(
      Object.keys(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId as GearName);
        return gear && this.elementalType
          ? gear.getTotalAttackPercent(this.elementalType)
          : 0;
      })
    ).toNumber();
  }

  public getTotalCritFlat(): number {
    return additiveSum(
      Object.keys(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId as GearName);
        return gear ? gear.getTotalCritFlat() : 0;
      })
    ).toNumber();
  }

  public getTotalCritPercent(): number {
    return additiveSum(
      Object.keys(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId as GearName);
        return gear ? gear.getTotalCritPercent() : 0;
      })
    ).toNumber();
  }

  public getTotalDamagePercent(): number {
    if (!this.elementalType) return 0;

    return additiveSum(
      Object.keys(this._gearsByTypeId).map((typeId) => {
        const gear = this.getGearByType(typeId as GearName);
        return gear && this.elementalType
          ? gear.getTotalDamagePercent(this.elementalType)
          : 0;
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

  public copyFromDTO(dto: GearSetDTO): void {
    const { id, name, gearsByTypeId, elementalType } = dto;

    this._id = id;
    this.name = name;
    this.elementalType = elementalType;

    this.resetGears();
    Object.keys(gearsByTypeId).forEach((typeId) => {
      const gearDTO = gearsByTypeId[typeId as GearName];
      const gearType = gearTypesLookup.byId[gearDTO.typeId];
      const gear = new Gear(gearType);
      gear.copyFromDTO(gearDTO);
      this._gearsByTypeId[typeId as GearName] = gear;
    });
  }

  public toDTO(): GearSetDTO {
    const { id, _gearsByTypeId, name, elementalType } = this;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const gearDTOsByTypeId: DataById<GearName, GearDTO> = {};
    Object.keys(_gearsByTypeId).forEach((typeId) => {
      const gear = _gearsByTypeId[typeId as GearName];
      const gearDTO = gear.toDTO();
      gearDTOsByTypeId[typeId as GearName] = gearDTO;
    });

    return {
      id,
      name,
      gearsByTypeId: gearDTOsByTypeId,
      elementalType,
    };
  }
}

export interface GearSetDTO {
  id: string;
  name: string;
  gearsByTypeId: DataById<GearName, GearDTO>;
  elementalType: CoreElementalType | undefined;
}
