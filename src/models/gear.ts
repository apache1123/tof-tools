import { GearType } from './gear-type';
import { newEmptyRandomStat, RandomStat } from './random-stat';
import { RandomStatType } from './random-stat-type';

export interface Gear {
  type: GearType;
  stars: number;
  randomStats: RandomStat[];
}

const maxStars = 5;

export function newEmptyGear(): Gear {
  return { type: undefined, stars: undefined, randomStats: [] };
}

export function setGearType(gear: Gear, type: GearType) {
  const numberOfRandomStats = type.numberOfRandomStats ?? 0;
  const randomStats = [...Array(numberOfRandomStats)].map(() =>
    newEmptyRandomStat()
  );

  gear.type = type;
  gear.randomStats = randomStats;
}

export function setGearStars(gear: Gear, stars: number) {
  if (!stars) {
    gear.stars = undefined;
  } else if (stars < 0 || stars > maxStars) {
    return;
  } else {
    gear.stars = stars;
  }
}

export function getGearRandomStat(gear: Gear, randomStatIndex: number) {
  const randomStat = gear.randomStats[randomStatIndex];
  return randomStat;
}

export function setGearRandomStatType(
  gear: Gear,
  randomStatIndex: number,
  statType: RandomStatType
) {
  const randomStat = getGearRandomStat(gear, randomStatIndex);
  randomStat.type = statType;
  resetGearRandomStatDefaultValue(gear, randomStatIndex);
}

export function setGearRandomStatValue(
  gear: Gear,
  randomStatIndex: number,
  value: number
) {
  const randomStat = getGearRandomStat(gear, randomStatIndex);
  randomStat.value = value;
}

export function resetGearRandomStatDefaultValue(
  gear: Gear,
  randomStatIndex: number
) {
  const randomStat = getGearRandomStat(gear, randomStatIndex);
  randomStat.value = randomStat.type?.defaultValue ?? 0;
}
