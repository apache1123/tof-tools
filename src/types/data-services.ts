import { GearConfig, GearDefinition, StatConfig, StatDefinition } from '.';

export interface StatConfigDataService {
  getAllStatConfigs(): StatConfig[];
}

export interface GearConfigDataService {
  getAllGearConfigs(): GearConfig[];
}

export interface StatDefinitionService {
  getAllStatDefinitions(
    statConfigDataService: StatConfigDataService
  ): StatDefinition[];
}

export interface GearDefinitionService {
  getAllGearDefinitions(
    gearConfigDataService: GearConfigDataService,
    statDefinitionService: StatDefinitionService,
    statConfigDataService: StatConfigDataService
  ): GearDefinition[];
}
