import { Stat } from ".";

export interface StatsDataService {
  getAllStats(): Stat[];
}