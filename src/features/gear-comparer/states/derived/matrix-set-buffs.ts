import { derive } from 'valtio/utils';

import { getDefinition } from '../../../../models/matrix-set';
import type {
  MatrixSetAttackPercentBuff,
  MatrixSetBuff,
  MatrixSetCritDamageBuff,
  MatrixSetCritRateBuff,
} from '../../../../models/matrix-set-buff';
import type { MatrixSetBuffDefinition } from '../../../../models/matrix-set-buff-definition';
import type { Team } from '../../../../models/team';
import { getDefinition as getWeaponDefinition } from '../../../../models/weapon';
import { getMatrixSets } from '../../../../models/weapon-matrix-sets';
import { gearComparerOptionsState } from '../gear-comparer-options';
import { selectedElementalTeamState } from './selected-elemental-team';

export interface MatrixSetBuffsState {
  matrixAttackPercentBuffs: MatrixSetAttackPercentBuff[];
  matrixCritRateBuffs: MatrixSetCritRateBuff[];
  matrixCritDamageBuffs: MatrixSetCritDamageBuff[];
}

export const matrixSetBuffsState = derive<object, MatrixSetBuffsState>({
  matrixAttackPercentBuffs: (get) => {
    const { selectedElementalType } = get(gearComparerOptionsState);
    const { selectedElementalTeam } = get(selectedElementalTeamState);

    if (!selectedElementalType || !selectedElementalTeam) return [];

    const buffs: MatrixSetAttackPercentBuff[] = [];
    const { weapon1, weapon2, weapon3 } = selectedElementalTeam;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      getMatrixSets(weapon.matrixSets).forEach((matrixSet) => {
        const { stars } = matrixSet;
        const matrixSetDefinition = getDefinition(matrixSet);

        matrixSetDefinition.attackPercentBuffs.forEach((buffDefinition) => {
          if (
            !hasMetMatrixBuffRequirements(buffDefinition, selectedElementalTeam)
          )
            return;
          if (!buffDefinition.elementalTypes.includes(selectedElementalType))
            return;

          const {
            description,
            starValues,
            elementalTypes,
            canStack,
            isActivePassively,
          } = buffDefinition;
          const value =
            starValues.find(({ star }) => star === stars)?.value ?? 0;

          const buff: MatrixSetAttackPercentBuff = {
            description,
            value,
            stars,
            elementalTypes,
            isActivePassively,
            matrixSetId: matrixSetDefinition.id,
            matrixSetDisplayName: matrixSetDefinition.displayName,
          };
          addBuff(buff, buffs, canStack);
        });
      });
    });

    return buffs;
  },
  matrixCritRateBuffs: (get) => {
    const { selectedElementalTeam } = get(selectedElementalTeamState);
    if (!selectedElementalTeam) return [];

    const buffs: MatrixSetCritRateBuff[] = [];
    const { weapon1, weapon2, weapon3 } = selectedElementalTeam;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      getMatrixSets(weapon.matrixSets).forEach((matrixSet) => {
        const { stars } = matrixSet;
        const matrixSetDefinition = getDefinition(matrixSet);

        matrixSetDefinition.critRateBuffs.forEach((buffDefinition) => {
          if (
            !hasMetMatrixBuffRequirements(buffDefinition, selectedElementalTeam)
          )
            return;

          const { description, starValues, canStack, isActivePassively } =
            buffDefinition;
          const value =
            starValues.find(({ star }) => star === stars)?.value ?? 0;

          const buff = {
            description,
            value,
            stars,
            isActivePassively,
            matrixSetId: matrixSetDefinition.id,
            matrixSetDisplayName: matrixSetDefinition.displayName,
          };
          addBuff(buff, buffs, canStack);
        });
      });
    });

    return buffs;
  },
  matrixCritDamageBuffs: (get) => {
    const { selectedElementalTeam } = get(selectedElementalTeamState);
    if (!selectedElementalTeam) return [];

    const buffs: MatrixSetCritDamageBuff[] = [];
    const { weapon1, weapon2, weapon3 } = selectedElementalTeam;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      getMatrixSets(weapon.matrixSets).forEach((matrixSet) => {
        const { stars } = matrixSet;
        const matrixSetDefinition = getDefinition(matrixSet);

        matrixSetDefinition.critDamageBuffs.forEach((buffDefinition) => {
          if (
            !hasMetMatrixBuffRequirements(buffDefinition, selectedElementalTeam)
          )
            return;

          const { description, starValues, isActivePassively, canStack } =
            buffDefinition;
          const value =
            starValues.find(({ star }) => star === stars)?.value ?? 0;

          const buff = {
            description,
            value,
            stars,
            isActivePassively,
            matrixSetId: matrixSetDefinition.id,
            matrixSetDisplayName: matrixSetDefinition.displayName,
          };
          addBuff(buff, buffs, canStack);
        });
      });
    });

    return buffs;
  },
});

function hasMetMatrixBuffRequirements(
  buffDefinition: MatrixSetBuffDefinition,
  team: Team
) {
  const { elementalWeaponsRequirements } = buffDefinition;
  if (elementalWeaponsRequirements) {
    const { weapon1, weapon2, weapon3 } = team;
    const weaponElementalTypes = [weapon1, weapon2, weapon3].map((weapon) =>
      weapon ? getWeaponDefinition(weapon).elementalType : undefined
    );

    let hasMetElementalWeaponsRequirement = false;
    elementalWeaponsRequirements.forEach(
      ({ weaponElementalType, minNumOfWeapons }) => {
        if (
          weaponElementalTypes.filter((x) => x === weaponElementalType)
            .length >= minNumOfWeapons
        )
          hasMetElementalWeaponsRequirement = true;
      }
    );

    if (!hasMetElementalWeaponsRequirement) return false;
  }

  return true;
}

function addBuff(
  buff: MatrixSetBuff,
  collection: MatrixSetBuff[],
  canStack: boolean
) {
  if (canStack) {
    collection.push(buff);
  } else {
    const duplicate = collection.find(
      (addedBuff) => addedBuff.matrixSetId === buff.matrixSetId
    );
    if (duplicate) {
      duplicate.stars = Math.max(duplicate.stars, buff.stars);
      duplicate.value = Math.max(duplicate.value, buff.value);
    } else {
      collection.push(buff);
    }
  }
}
