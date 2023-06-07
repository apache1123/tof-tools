import { useImmer } from 'use-immer';
import {
  Gear,
  newEmptyGear,
  setGearRandomStatType,
  setGearRandomStatValue,
  setGearType,
} from '../models/gear';
import { GearType } from '../models/gear-type';
import { RandomStatType } from '../models/random-stat-type';

export const useGear = () => {
  const [gear, setGear] = useImmer<Gear>(newEmptyGear);

  return {
    gear,
    setGearType: (type: GearType) =>
      setGear((draftGear) => setGearType(draftGear, type)),
    setRandomStatType: (randomStatIndex: number, statType: RandomStatType) =>
      setGear((draftGear) =>
        setGearRandomStatType(draftGear, randomStatIndex, statType)
      ),
    setRandomStatValue: (randomStatIndex: number, value: number) =>
      setGear((draftGear) =>
        setGearRandomStatValue(draftGear, randomStatIndex, value)
      ),
  };
};
