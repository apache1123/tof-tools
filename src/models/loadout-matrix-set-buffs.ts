import type { Loadout } from './loadout';
import type {
  MatrixSetAttackPercentBuff,
  MatrixSetBuff,
  MatrixSetCritDamageBuff,
  MatrixSetCritRateBuff,
} from './matrix-set-buff';
import type { MatrixSetBuffDefinition } from './matrix-set-buff-definition';

export class LoadoutMatrixSetBuffs {
  private _loadout: Loadout;

  public constructor(loadout: Loadout) {
    this._loadout = loadout;
  }

  /** Matrix set attack% buffs that have met the requirements to be enabled.
   * They could be active when idle (passive buff), or inactive when idle (conditional buff), but are ready to be activated in combat.
   */
  public get attackPercentBuffs(): MatrixSetAttackPercentBuff[] {
    const { elementalType, team } = this._loadout;

    const buffs: MatrixSetAttackPercentBuff[] = [];
    const { weapon1, weapon2, weapon3 } = team;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      weapon.matrixSets.getMatrixSets().forEach((matrixSet) => {
        const { stars } = matrixSet;
        const matrixSetDefinition = matrixSet.definition;

        matrixSetDefinition.attackPercentBuffs.forEach((buffDefinition) => {
          if (!this.hasMetBuffRequirements(buffDefinition)) return;
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
          this.addBuff(buff, buffs, canStack);
        });
      });
    });

    return buffs;
  }

  /** Matrix set crit% buffs that have met the requirements to be enabled.
   * They could be active when idle (passive buff), or inactive when idle (conditional buff), but are ready to be activated in combat.
   */
  public get critRateBuffs(): MatrixSetCritRateBuff[] {
    const buffs: MatrixSetCritRateBuff[] = [];
    const { weapon1, weapon2, weapon3 } = this._loadout.team;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      weapon.matrixSets.getMatrixSets().forEach((matrixSet) => {
        const { stars } = matrixSet;
        const matrixSetDefinition = matrixSet.definition;

        matrixSetDefinition.critRateBuffs.forEach((buffDefinition) => {
          if (!this.hasMetBuffRequirements(buffDefinition)) return;

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
          this.addBuff(buff, buffs, canStack);
        });
      });
    });

    return buffs;
  }

  /** Matrix set crit dmg% buffs that have met the requirements to be enabled.
   * They could be active when idle (passive buff), or inactive when idle (conditional buff), but are ready to be activated in combat.
   */
  public get critDamageBuffs(): MatrixSetCritDamageBuff[] {
    const buffs: MatrixSetCritDamageBuff[] = [];
    const { weapon1, weapon2, weapon3 } = this._loadout.team;
    [weapon1, weapon2, weapon3].forEach((weapon) => {
      if (!weapon) return;

      weapon.matrixSets.getMatrixSets().forEach((matrixSet) => {
        const { stars } = matrixSet;
        const matrixSetDefinition = matrixSet.definition;

        matrixSetDefinition.critDamageBuffs.forEach((buffDefinition) => {
          if (!this.hasMetBuffRequirements(buffDefinition)) return;

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
          this.addBuff(buff, buffs, canStack);
        });
      });
    });

    return buffs;
  }

  private hasMetBuffRequirements(buffDefinition: MatrixSetBuffDefinition) {
    const { elementalWeaponsRequirements, weaponRequirement } = buffDefinition;

    // TODO: This is duplicated in loadout-weapon-buffs.ts
    if (elementalWeaponsRequirements) {
      const { weapon1, weapon2, weapon3 } = this._loadout.team;
      const weaponElementalTypes = [weapon1, weapon2, weapon3].flatMap(
        (weapon) => (weapon ? weapon.definition.elementalTypes : [])
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
      const { weapon1, weapon2, weapon3 } = this._loadout.team;
      const weaponNames = [weapon1, weapon2, weapon3].map((weapon) =>
        weapon ? weapon.definition.id : undefined
      );

      if (!weaponNames.includes(weaponRequirement)) return false;
    }

    return true;
  }

  private addBuff(
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
}
