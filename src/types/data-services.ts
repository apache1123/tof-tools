import { GearDefinition, StatDefinition } from '.';

export interface StatsDataService {
  getAllStatDefinitions(): StatDefinition[];
}

export interface GearDataService {
  getAllGearDefinitions(): GearDefinition[];
}
