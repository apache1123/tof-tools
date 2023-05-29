import stats from '../../resources/stats';
import { Stat } from '../types';
import { StatsDataService } from '../types';

const getAllStats = (): Stat[] => stats;

const statsDataService: StatsDataService = {
  getAllStats,
};

export default statsDataService;
