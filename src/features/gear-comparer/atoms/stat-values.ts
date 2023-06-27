import { atomWithStorage } from 'jotai/utils';

import { maxCharacterLevel } from '../../../../configs/character-level';
import { ElementalType } from '../../../models/stat-type';

export const elementalTypeAtom = atomWithStorage<ElementalType | undefined>(
  'elementalType',
  undefined
);
export const otherAttackFlatAtom = atomWithStorage('otherAttackFlat', 0);
export const critFlatAtom = atomWithStorage('critFlat', 0);
export const characterLevelAtom = atomWithStorage(
  'characterLevel',
  maxCharacterLevel
);

export const otherGearAttackPercentAtom = atomWithStorage(
  'otherGearAttackPercent',
  0
);
export const otherGearElementalDamageAtom = atomWithStorage(
  'otherGearElementalDamage',
  0
);

export const miscAttackPercentAtom = atomWithStorage('miscAttackPercent', 0);
export const miscCritRateAtom = atomWithStorage('miscCrateRate', 0);
export const miscCritDamageAtom = atomWithStorage('miscCritDamage', 0);

if (process.env.NODE_ENV !== 'production') {
  elementalTypeAtom.debugLabel = 'elementalType';
  otherAttackFlatAtom.debugLabel = 'otherAttackFlat';
  critFlatAtom.debugLabel = 'critFlat';
  characterLevelAtom.debugLabel = 'characterLevel';
  otherGearAttackPercentAtom.debugLabel = 'otherGearAttackPercent';
  otherGearElementalDamageAtom.debugLabel = 'otherGearElementalDamage';
  miscAttackPercentAtom.debugLabel = 'miscAttackPercent';
  miscCritRateAtom.debugLabel = 'miscCritRate';
  miscCritDamageAtom.debugLabel = 'miscCritDamage';
}
