import { gearConfigs } from '../../configs/gear-configs';
import { GearConfigDataService } from '../types';

const getAllGearConfigs = () => gearConfigs;

export const gearConfigDataService: GearConfigDataService = {
  getAllGearConfigs,
};
