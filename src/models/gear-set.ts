import { nanoid } from 'nanoid';

import { gearTypesLookup } from '../constants/gear-types';
import type { DataById } from './data';
import { type Gear, newGear } from './gear';
import type { GearName } from './gear-type';

export interface GearSet {
  id: string;
  name: string;
  gearsByTypeId: DataById<GearName, Gear>;
}

export function newGearSet(name: string): GearSet {
  const gearSet: GearSet = { id: nanoid(), name, gearsByTypeId: {} } as GearSet;
  populateAllEmptyGear(gearSet);
  return gearSet;
}

export function getGearByType(
  gearSet: GearSet,
  typeId: GearName
): Gear | undefined {
  return gearSet.gearsByTypeId[typeId];
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
