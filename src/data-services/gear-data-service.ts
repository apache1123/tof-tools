import { gearDefinitions } from '../../data/gear-definitions';
import { GearDataService } from '../types';

const getAllGearDefinitions = () => gearDefinitions;

export const gearDataService: GearDataService = {
  getAllGearDefinitions,
};
