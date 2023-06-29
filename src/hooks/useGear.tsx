import { useImmer } from 'use-immer';

import {
  Gear,
  newEmptyGear,
  setGearRandomStatType,
  setGearRandomStatValue,
  setGearStars,
  setGearType,
} from '../models/gear';
import { GearType } from '../models/gear-type';
import { StatType } from '../models/stat-type';

export const useGear = () => {
  const [gear, setGear] = useImmer<Gear>(newEmptyGear);

  return {
    gear,
    setGear,
    setGearType: (type: GearType) =>
      setGear((draftGear) => setGearType(draftGear, type)),
    setGearStars: (stars: number) =>
      setGear((draftGear) => setGearStars(draftGear, stars)),
    setRandomStatType: (randomStatIndex: number, statType: StatType) =>
      setGear((draftGear) =>
        setGearRandomStatType(draftGear, randomStatIndex, statType)
      ),
    setRandomStatValue: (randomStatIndex: number, value: number) =>
      setGear((draftGear) =>
        setGearRandomStatValue(draftGear, randomStatIndex, value)
      ),
  };
};
