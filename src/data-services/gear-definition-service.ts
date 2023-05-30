import {
  GearConfigDataService,
  GearDefinition,
  GearDefinitionService,
  GearName,
  GearVersion,
  StatConfigDataService,
  StatDefinitionService,
} from '../types';

export const gearDefinitionService: GearDefinitionService = {
  getAllGearDefinitions(
    gearConfigDataService: GearConfigDataService,
    statDefinitionService: StatDefinitionService,
    statConfigDataService: StatConfigDataService
  ) {
    const gearConfigs = gearConfigDataService.getAllGearConfigs();
    const statDefinitions = statDefinitionService.getAllStatDefinitions(
      statConfigDataService
    );

    return gearConfigs.map(
      ({ name, availableStatNames, version, ...rest }): GearDefinition => ({
        name: name as GearName,
        availableStatDefinitions: statDefinitions.filter((def) =>
          availableStatNames.includes(def.name)
        ),
        version: version as GearVersion,
        ...rest,
      })
    );
  },
};
