import type { Attack } from './attack';
import type { AttackCommand } from './attack-command';

export type AttackResult = AttackCommand & Attack;
