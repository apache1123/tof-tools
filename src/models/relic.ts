import type { RelicName } from '../constants/relics';
import type { RelicAttackDefinition } from './relic-attack-definition';
import type { RelicBuffDefinition } from './relic-buff-definition';

export interface Relic {
  id: RelicName;
  displayName: string;
  rarity: 'SR' | 'SSR';
  buffs: RelicBuffDefinition[];
  attacks: RelicAttackDefinition[];
  remarks?: string;
}
