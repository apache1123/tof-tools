import { GearType } from './gear-type';
import { RandomStat, newEmptyRandomStat } from './random-stat';
import { RandomStatType } from './random-stat-type';

export interface Gear {
  type: GearType;
  randomStats: RandomStat[];
}

export function newEmptyGear(): Gear {
  return { type: null, randomStats: [] };
}

export function setGearType(gear: Gear, type: GearType) {
  const numberOfRandomStats = type.numberOfRandomStats ?? 0;
  const randomStats = [...Array(numberOfRandomStats)].map(() =>
    newEmptyRandomStat()
  );

  gear.type = type;
  gear.randomStats = randomStats;
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
