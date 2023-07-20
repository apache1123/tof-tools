import { nanoid } from 'nanoid';

import { gearTypesLookup } from '../constants/gear-types';
import type { DataById } from './data';
import { type Gear, newGear } from './gear';
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
