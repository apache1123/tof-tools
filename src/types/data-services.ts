import { StatDefinition } from '.';

export interface StatsDataService {
  getAllStatDefinitions(): StatDefinition[];
}
