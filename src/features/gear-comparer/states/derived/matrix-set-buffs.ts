import { derive } from 'valtio/utils';

import type {
  MatrixSetAttackPercentBuff,
  MatrixSetBuff,
  MatrixSetCritDamageBuff,
  MatrixSetCritRateBuff,
} from '../../../../models/matrix-set-buff';
import type { MatrixSetBuffDefinition } from '../../../../models/matrix-set-buff-definition';
import type { Team } from '../../../../models/team';
import { gearComparerState } from '../../../../states/states';

export interface MatrixSetBuffsState {
  matrixAttackPercentBuffs: MatrixSetAttackPercentBuff[];
  matrixCritRateBuffs: MatrixSetCritRateBuff[];
  matrixCritDamageBuffs: MatrixSetCritDamageBuff[];
}

export const matrixSetBuffsState = derive<object, MatrixSetBuffsState>({
  matrixAttackPercentBuffs: (get) => {
    const {
      selectedLoadout: { elementalType, team },
    } = get(gearComparerState);

    const buffs: MatrixSetAttackPercentBuff[] = [];
    const { weapon1, weapon2, weapon3 } = team;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      weapon.matrixSets.getMatrixSets().forEach((matrixSet) => {
        const { stars } = matrixSet;
        const matrixSetDefinition = matrixSet.definition;

        matrixSetDefinition.attackPercentBuffs.forEach((buffDefinition) => {
          if (!hasMetMatrixBuffRequirements(buffDefinition, team)) return;
          if (!buffDefinition.elementalTypes.includes(elementalType)) return;

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
    const {
      selectedLoadout: { team },
    } = get(gearComparerState);

    const buffs: MatrixSetCritRateBuff[] = [];
    const { weapon1, weapon2, weapon3 } = team;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      weapon.matrixSets.getMatrixSets().forEach((matrixSet) => {
        const { stars } = matrixSet;
        const matrixSetDefinition = matrixSet.definition;

        matrixSetDefinition.critRateBuffs.forEach((buffDefinition) => {
          if (!hasMetMatrixBuffRequirements(buffDefinition, team)) return;

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
    const {
      selectedLoadout: { team },
    } = get(gearComparerState);

    const buffs: MatrixSetCritDamageBuff[] = [];
    const { weapon1, weapon2, weapon3 } = team;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      weapon.matrixSets.getMatrixSets().forEach((matrixSet) => {
        const { stars } = matrixSet;
        const matrixSetDefinition = matrixSet.definition;

        matrixSetDefinition.critDamageBuffs.forEach((buffDefinition) => {
          if (!hasMetMatrixBuffRequirements(buffDefinition, team)) return;

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
  const { elementalWeaponsRequirements, weaponRequirement } = buffDefinition;

  // TODO: This is duplicated in weapon-buffs.ts
  if (elementalWeaponsRequirements) {
    const { weapon1, weapon2, weapon3 } = team;
    const weaponElementalTypes = [weapon1, weapon2, weapon3].map((weapon) =>
      weapon ? weapon.definition.elementalType : undefined
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

  if (weaponRequirement) {
    const { weapon1, weapon2, weapon3 } = team;
    const weaponNames = [weapon1, weapon2, weapon3].map((weapon) =>
      weapon ? weapon.definition.id : undefined
    );

    if (!weaponNames.includes(weaponRequirement)) return false;
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
