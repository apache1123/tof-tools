import { nanoid } from 'nanoid';

import { maxStars } from '../constants/gear';
import { gearTypesLookup } from '../constants/gear-types';
import type { GearName, GearType } from './gear-type';
import {
  copyRandomStat,
  getType as getRandomStatType,
  newRandomStat,
  type RandomStat,
} from './random-stat';

export interface Gear {
  id: string;
  typeId: GearName;
  stars: number;
  randomStats: (RandomStat | undefined)[];
}

export function newGear(type: GearType) {
  const gear = { id: nanoid(), stars: 0, randomStats: [] } as unknown as Gear;
  setType(gear, type);
  return gear;
}

// Copy all gear properties over except for the id
export function copyGear(fromGear: Gear, toGear: Gear) {
  setType(toGear, getType(fromGear));
  setStars(toGear, fromGear.stars);
  fromGear.randomStats.forEach((fromRandomStat, index) => {
    if (fromRandomStat) {
      if (toGear.randomStats[index]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        copyRandomStat(fromRandomStat, toGear.randomStats[index]!);
      } else {
        const newStat = newRandomStat(getRandomStatType(fromRandomStat));
        copyRandomStat(fromRandomStat, newStat);
        toGear.randomStats[index] = newStat;
      }
    }
  });
}

export function getType(gear: Gear) {
  return gearTypesLookup.byId[gear.typeId];
}
export function setType(gear: Gear, type: GearType) {
  gear.typeId = type.id;

  const randomStats = [...Array(type.numberOfRandomStats)].map(() => undefined);
  gear.randomStats = randomStats;
}

export function setStars(gear: Gear, stars: number) {
  if (stars >= 0 && stars <= maxStars) {
    gear.stars = stars;
  }
}
