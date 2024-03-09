import type { RelicName } from '../../constants/relics';
import type { RelicAttackDefinition } from './relic-attack-definition';
import type { RelicDamageBuffDefinition } from './relic-damage-buff-definition';

export interface Relic {
  id: RelicName;
  displayName: string;
  rarity: 'SR' | 'SSR';
  buffs: RelicDamageBuffDefinition[];
  attacks: RelicAttackDefinition[];
  passiveBuffs: RelicDamageBuffDefinition[];
  remarks?: string;
}
