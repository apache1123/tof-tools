import type { Attack } from './attack';

export type AttackCommand = Pick<Attack, 'weapon' | 'attackDefinition'>;
