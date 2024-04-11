import type { SimulacrumName } from '../../constants/simulacrum-traits';
import type { BuffDefinition } from './buff/buff-definition';

export interface SimulacrumTrait {
  id: SimulacrumName;
  displayName: string;
  buffs: BuffDefinition[];

  remarks?: string;
}
