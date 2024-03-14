import type { RelicName } from '../../constants/relics';
import type { RelicDamageBuffDefinition } from './buffs/relic-damage-buff-definition';
import type { RelicAttackDefinition } from './relic-attack-definition';

export interface Relic {
  id: RelicName;
  displayName: string;
  rarity: 'SR' | 'SSR';
  damageBuffs: RelicDamageBuffDefinition[];
  attacks: RelicAttackDefinition[];
  remarks?: string;
}
