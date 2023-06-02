import { GearType } from './gear';
import { RandomStatType, StatType } from './stat';

export interface StatTypeService {
  getAllStatTypes(): StatType[];
  getAllRandomStatTypes(): RandomStatType[];
}

export interface GearTypeService {
  getAllGearTypes(statTypeService: StatTypeService): GearType[];
}
