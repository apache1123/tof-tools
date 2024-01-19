import type { DamageBuff } from './damage-buff';

export interface RelicBuffDefinition {
  id: string;
  displayName: string;
  description: string;
  damageBuff: DamageBuff;
  minStarRequirement: number;
  maxStarRequirement: number;
  /** Assumptions, compromises made etc. */
  remarks?: string;
}
