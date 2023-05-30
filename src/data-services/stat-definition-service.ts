import {
  ElementalType,
  StatConfigDataService,
  StatDefinition,
  StatDefinitionService,
  StatName,
  StatType,
} from '../types';

export const statDefinitionService: StatDefinitionService = {
  getAllStatDefinitions(statConfigDataService: StatConfigDataService) {
    return statConfigDataService.getAllStatConfigs().map(
      ({ name, type, elementalType: element, ...rest }): StatDefinition => ({
        name: name as StatName,
        type: type as StatType,
        elementalType: element as ElementalType,
        ...rest,
      })
    );
  },
};
