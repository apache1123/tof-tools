import statDefinitions from '../../data/stat-definitions';
import { StatDefinition } from '../types';
import { StatsDataService } from '../types';

const getAllStatDefinitions = (): StatDefinition[] => statDefinitions;

const statsDataService: StatsDataService = {
  getAllStatDefinitions,
};

export default statsDataService;
