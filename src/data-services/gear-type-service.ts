import { gearTypes as gearTypesFromConfig } from '../../configs/gear-types';
import {
  GearName,
  GearTypeService,
  GearVersion,
  StatTypeService,
} from '../types';

export const gearTypeService: GearTypeService = {
  getAllGearTypes(statTypeService: StatTypeService) {
    const allRandomStatTypes = statTypeService.getAllRandomStatTypes();

    return gearTypesFromConfig.map(
      ({ name, possibleRandomStatTypeNames, version, ...rest }) => ({
        // The string to enum conversions below don't account for incorrect string inputs
        name: name as GearName,
        possibleRandomStatTypes: possibleRandomStatTypeNames.map(
          (statTypeName) =>
            allRandomStatTypes.find((x) => x.name === statTypeName)
        ),
        version: version as GearVersion,
        ...rest,
      })
    );
  },
};
