import type { Weapon } from '../../weapon';
import type { AttackDefinition } from './attack-definition';
import type { AttackTimeline } from './attack-timeline';

export interface AttackRegistryItem {
  weapon: Weapon;
  attackDefinition: AttackDefinition;
  attackTimeline: AttackTimeline;
}
