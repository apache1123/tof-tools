import { statTypesLookup } from '../constants/stat-types';
import type { StatName, StatType } from './stat-type';

export interface RandomStat {
  typeId: StatName;
  value: number;
}

export function newRandomStat(type: StatType): RandomStat {
  const randomStat = {} as RandomStat;
  setType(randomStat, type);
  return randomStat;
}

export function copyRandomStat(
  fromRandomStat: RandomStat,
  toRandomStat: RandomStat
) {
  setType(toRandomStat, getType(fromRandomStat));
  setValue(toRandomStat, fromRandomStat.value);
}

export function getType(randomStat: RandomStat) {
  return statTypesLookup.byId[randomStat.typeId];
}
export function setType(randomStat: RandomStat, type: StatType) {
  randomStat.typeId = type.id;
  resetValueToDefault(randomStat);
}

export function setValue(randomStat: RandomStat, value: number) {
  randomStat.value = value;
}

export function resetValueToDefault(randomStat: RandomStat) {
  const type = getType(randomStat);
  randomStat.value = type.randomStatDefaultValue;
}
