import { nanoid } from 'nanoid';

import { gearTypesLookup } from '../constants/gear-types';
import { additiveSum } from '../utils/math-utils';
import type { DataById } from './data';
import {
  type Gear,
  getTotalAttackFlat as getGearTotalAttackFlat,
  getTotalAttackPercent as getGearTotalAttackPercent,
  getTotalCritFlat as getGearTotalCritFlat,
  getTotalCritPercent as getGearTotalCritPercent,
  getTotalDamagePercent as getGearTotalDamagePercent,
  newGear,
} from './gear';
import type { GearName } from './gear-type';
import type { CoreElementalType } from './stat-type';

export interface GearSet {
  id: string;
  name: string;
  gearsByTypeId: DataById<GearName, Gear>;
  elementalType: CoreElementalType | undefined;
}

export function newGearSet(name: string): GearSet {
  const gearSet: GearSet = {
    id: nanoid(),
    name,
    gearsByTypeId: {},
    elementalType: undefined,
  } as GearSet;
  populateAllEmptyGear(gearSet);
  return gearSet;
}

export function getGearByType(
  gearSet: GearSet,
  typeId: GearName
): Gear | undefined {
  return gearSet.gearsByTypeId[typeId];
}

export function setName(gearSet: GearSet, name: string) {
  gearSet.name = name;
}

export function setElementalType(
  gearSet: GearSet,
  elementalType: CoreElementalType
) {
  gearSet.elementalType = elementalType;
}

export function getTotalAttackFlat(gearSet: GearSet): number {
  if (!gearSet.elementalType) {
    return 0;
  }
  const elementalType = gearSet.elementalType;

  return additiveSum(
    Object.keys(gearSet.gearsByTypeId).map((typeId) => {
      const gear = getGearByType(gearSet, typeId as GearName);
      return gear ? getGearTotalAttackFlat(gear, elementalType) : 0;
    })
  ).toNumber();
}

export function getTotalAttackPercent(gearSet: GearSet): number {
  if (!gearSet.elementalType) {
    return 0;
  }
  const elementalType = gearSet.elementalType;

  return additiveSum(
    Object.keys(gearSet.gearsByTypeId).map((typeId) => {
      const gear = getGearByType(gearSet, typeId as GearName);
      return gear ? getGearTotalAttackPercent(gear, elementalType) : 0;
    })
  ).toNumber();
}

export function getTotalCritFlat(gearSet: GearSet): number {
  return additiveSum(
    Object.keys(gearSet.gearsByTypeId).map((typeId) => {
      const gear = getGearByType(gearSet, typeId as GearName);
      return gear ? getGearTotalCritFlat(gear) : 0;
    })
  ).toNumber();
}

export function getTotalCritPercent(gearSet: GearSet): number {
  return additiveSum(
    Object.keys(gearSet.gearsByTypeId).map((typeId) => {
      const gear = getGearByType(gearSet, typeId as GearName);
      return gear ? getGearTotalCritPercent(gear) : 0;
    })
  ).toNumber();
}

export function getTotalDamagePercent(gearSet: GearSet): number {
  if (!gearSet.elementalType) {
    return 0;
  }
  const elementalType = gearSet.elementalType;

  return additiveSum(
    Object.keys(gearSet.gearsByTypeId).map((typeId) => {
      const gear = getGearByType(gearSet, typeId as GearName);
      return gear ? getGearTotalDamagePercent(gear, elementalType) : 0;
    })
  ).toNumber();
}

function addGear(gearSet: GearSet, gear: Gear) {
  gearSet.gearsByTypeId[gear.typeId] = gear;
}

function populateAllEmptyGear(gearSet: GearSet) {
  gearTypesLookup.allIds
    .map((gearTypeId) => gearTypesLookup.byId[gearTypeId])
    .forEach((gearType) => {
      const gear = newGear(gearType);
      addGear(gearSet, gear);
    });
}
