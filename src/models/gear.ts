import { GearType } from './gear-type';
import { newEmptyStat, Stat } from './stat';
import { StatType } from './stat-type';

export interface Gear {
  type: GearType | undefined;
  stars: number;
  randomStats: Stat[];
}

const maxStars = 5;

export function newEmptyGear(): Gear {
  return { type: undefined, stars: 0, randomStats: [] };
}

export function setGearType(gear: Gear, type: GearType) {
  const numberOfRandomStats = type?.numberOfRandomStats ?? 0;
  const randomStats = [...Array(numberOfRandomStats)].map(() => newEmptyStat());

  gear.type = type;
  gear.randomStats = randomStats;
}

export function setGearStars(gear: Gear, stars: number) {
  if (stars < 0 || stars > maxStars) {
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
  statType: StatType
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
  randomStat.value = randomStat.type?.randomStatDefaultValue ?? 0;
}
