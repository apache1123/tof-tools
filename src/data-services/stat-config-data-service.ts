import { statConfigs } from '../../configs/stat-configs';
import { StatConfigDataService } from '../types';

export const statConfigDataService: StatConfigDataService = {
  getAllStatConfigs() {
    return statConfigs;
  },
};
