import { statTypes as statTypesFromConfig } from '../../configs/stat-types';
import { randomStatTypes as randomStatTypesFromConfig } from '../../configs/random-stat-types';
import {
  ElementalType,
  RandomStatType,
  StatName,
  StatRole,
  StatType,
  StatTypeService,
} from '../types';

export const statTypeService: StatTypeService = {
  getAllStatTypes,

  getAllRandomStatTypes(): RandomStatType[] {
    const allStatTypes = getAllStatTypes();
    return randomStatTypesFromConfig.map(
      ({ name, defaultValue, rollRange }) => {
        const statType = allStatTypes.find((x) => x.name === name);
        if (!statType) {
          throw new Error(
            `Cannot find statType from randomStatTypeName: ${name}`
          );
        }

        return {
          defaultValue,
          rollRange,
          ...statType,
        };
      }
    );
  },
};

function getAllStatTypes(): StatType[] {
  return statTypesFromConfig.map(({ name, role, elementalType, ...rest }) => ({
    // The string to enum conversions below don't account for incorrect string inputs
    name: name as StatName,
    role: role as StatRole,
    elementalType: elementalType as ElementalType,
    ...rest,
  }));
}
