import { nanoid } from "nanoid";

import {
  persistenceKeyPrefix,
  repositoryKeyPrefix,
} from "../../constants/persistence";
import type { CharacterDataDto } from "../../db/repositories/character/character-data-dto";
import type { CharacterPresetDto } from "../../db/repositories/character-preset/character-preset-dto";
import type { GearDto } from "../../db/repositories/gear/dtos/gear-dto";
import type { GearSetDto } from "../../db/repositories/gear/dtos/gear-set-dto";
import type { GearSetPresetDto } from "../../db/repositories/gear/dtos/gear-set-preset-dto";
import type { MatrixDto } from "../../db/repositories/matrix/dtos/matrix-dto";
import type { MatrixSlotsDto } from "../../db/repositories/matrix/dtos/matrix-slots-dto";
import type { TeamPresetDto } from "../../db/repositories/team/dtos/team-preset-dto";
import type { WeaponPresetDto } from "../../db/repositories/weapon/dtos/weapon-preset-dto";
import { maxCharacterLevel } from "../../definitions/character-level";
import type { GearTypeId } from "../../definitions/gear-types";
import { getAllMatrixDefinitions } from "../../definitions/matrices/matrix-definitions";
import { getWeaponDefinition } from "../../definitions/weapons/weapon-definitions";
import type { MatrixTypeId } from "../../models/matrix/matrix-type";
import { filterOutUndefined } from "../../utils/array-utils";
import { logException } from "../../utils/exception-utils";
import { DataMigrationError } from "../error/data-migration-error";
import type { GearComparerStateDtoV3 } from "./deprecated/gear-comparer-state-dto";
import type { LoadoutsStateDtoV3 } from "./deprecated/loadouts-state-dto";
import { matrixSet4pcIdSuffix } from "./deprecated/matrix-set-definition";
import type { UserStatsStateDtoV3 } from "./deprecated/user-stats-state-dto";

/**
 * During app v4 rewrite, migrated to using mostly flat data structure repos for each entity
 */
export function migrateToRepos() {
  const oldUserStatsKey = "userStats";
  const oldLoadoutsKey = "loadouts";
  const oldGearComparerKey = "gearComparer";

  const oldUserStatsJson = localStorage.getItem(oldUserStatsKey);
  const oldLoadoutsJson = localStorage.getItem(oldLoadoutsKey);
  const oldGearComparerJson = localStorage.getItem(oldGearComparerKey);

  const oldUserStatsState = oldUserStatsJson
    ? (JSON.parse(oldUserStatsJson) as UserStatsStateDtoV3)
    : undefined;
  const oldLoadoutsState = oldLoadoutsJson
    ? (JSON.parse(oldLoadoutsJson) as LoadoutsStateDtoV3)
    : undefined;
  const oldGearComparerState = oldGearComparerJson
    ? (JSON.parse(oldGearComparerJson) as GearComparerStateDtoV3)
    : undefined;

  if (!oldLoadoutsState) {
    // Nothing to migrate. Even though there may be old userStats data, it's not worth migrating
    removeOldData();
    return;
  }

  // All old data we are migrating, in case anything goes wrong
  const oldData = {
    userStats: oldUserStatsState,
    loadouts: oldLoadoutsState,
    gearComparer: oldGearComparerState,
  };
  localStorage.setItem(
    `${persistenceKeyPrefix}v3-to-v4-migration-backup`,
    JSON.stringify(oldData),
  );

  // Migrating, roughly:
  // - UserStats -> CharacterData
  // - Loadout -> CharacterPreset
  // - Loadout.team -> CharacterPreset.teamPresetId (TeamPreset)
  // - Loadout.gearSet -> CharacterPreset.gearSetPresetId (GearSetPreset)
  // - Loadout.loadoutStats -> CharacterPreset

  const newCharacterDataRepoKey = `${repositoryKeyPrefix}characters`;
  const newCharacterPresetRepoKey = `${repositoryKeyPrefix}characterPresets`;
  const newTeamPresetRepoKey = `${repositoryKeyPrefix}teamPresets`;
  const newWeaponPresetRepoKey = `${repositoryKeyPrefix}weaponPresets`;
  const newMatrixRepoKey = `${repositoryKeyPrefix}matrices`;
  const newGearSetPresetRepoKey = `${repositoryKeyPrefix}gearSetPresets`;
  const newGearRepoKey = `${repositoryKeyPrefix}gears`;

  try {
    const newCharacterDataRepo: CharacterDataDto[] = [];
    const newCharacterPresetRepo: CharacterPresetDto[] = [];
    const newTeamPresetRepo: TeamPresetDto[] = [];
    const newWeaponPresetRepo: WeaponPresetDto[] = [];
    const newMatrixRepo: MatrixDto[] = [];
    const newGearSetPresetRepo: GearSetPresetDto[] = [];
    const newGearRepo: GearDto[] = [];

    const newCharacterData: CharacterDataDto = {
      id: nanoid(),
      name: "Default wanderer",
      level: oldUserStatsState?.characterLevel ?? maxCharacterLevel,
    };
    newCharacterDataRepo.push(newCharacterData);

    oldLoadoutsState.loadoutList.forEach(({ loadout }) => {
      // Migrate team
      const newTeamPreset: TeamPresetDto = {
        id: nanoid(),
        characterId: newCharacterData.id,
        weaponPresetIds: [],
        name: `${loadout.name} team`,
      };

      // The `weapons` field was added to the DTO code later, but the data was never amended, so there is a chance the user data does not have it
      const weapons =
        loadout.team.weapons ??
        filterOutUndefined([
          loadout.team.weapon1,
          loadout.team.weapon2,
          loadout.team.weapon3,
        ]);

      if (weapons.length) {
        // QOL roughly check if user may be using weapon2 as main weapon, and not weapon1, by promoting the on-element weapon to first
        const onElementWeapon = weapons.find(
          (weapon) =>
            getWeaponDefinition(weapon.definitionId).damageElement ===
            loadout.elementalType,
        );

        const adjustedWeapons = onElementWeapon
          ? [
              onElementWeapon,
              ...weapons.filter((weapon) => weapon !== onElementWeapon),
            ]
          : weapons;

        // Migrate weapons
        adjustedWeapons.forEach((oldWeapon) => {
          // Re-use a weapon preset if it exists
          const existingWeaponPreset = newWeaponPresetRepo.find(
            (weaponPreset) => {
              if (
                weaponPreset.definitionId !== oldWeapon.definitionId ||
                weaponPreset.stars !== oldWeapon.stars
              ) {
                return false;
              }

              // We are only migrating 4pc matrices below, only check for those. Only check the first matrix slot for new weapon presets as we are only handling 4pc matrices for now and all slots will be the same.
              if (!oldWeapon.matrixSets.matrixSet4pc) {
                return true;
              }

              const existingFirstMatrix = newMatrixRepo.find(
                (matrix) =>
                  matrix.id === weaponPreset.matrixSlots.mind.matrixId,
              );

              if (!existingFirstMatrix) {
                return false;
              }

              const old4pcDefinitionIdWithoutSuffix =
                oldWeapon.matrixSets.matrixSet4pc.definitionId.replace(
                  ` ${matrixSet4pcIdSuffix}`,
                  "",
                );

              return (
                existingFirstMatrix.definitionId ===
                  old4pcDefinitionIdWithoutSuffix &&
                existingFirstMatrix.stars ===
                  oldWeapon.matrixSets.matrixSet4pc.stars
              );
            },
          );

          if (existingWeaponPreset) {
            newTeamPreset.weaponPresetIds.push(existingWeaponPreset.id);
          } else {
            const newMatrixSlots: MatrixSlotsDto = {
              mind: { acceptsTypeId: "mind", matrixId: undefined },
              memory: { acceptsTypeId: "memory", matrixId: undefined },
              belief: { acceptsTypeId: "belief", matrixId: undefined },
              emotion: { acceptsTypeId: "emotion", matrixId: undefined },
            };

            // Migrate matrices

            // Can only migrate 4pc matrices unfortunately, for 2pc we can't know which slots to put them in
            const oldMatrixSet4pc = oldWeapon.matrixSets.matrixSet4pc;
            if (oldMatrixSet4pc) {
              fillMatrix("mind");
              fillMatrix("memory");
              fillMatrix("belief");
              fillMatrix("emotion");

              function fillMatrix(typeId: MatrixTypeId) {
                const old4pcDefinitionIdWithoutSuffix =
                  oldMatrixSet4pc!.definitionId.replace(
                    ` ${matrixSet4pcIdSuffix}`,
                    "",
                  );

                const newDefinitionId = getAllMatrixDefinitions().find(
                  (definition) =>
                    definition.id === old4pcDefinitionIdWithoutSuffix,
                )?.id;

                if (!newDefinitionId) {
                  throw new DataMigrationError(
                    "Cannot match matrix definition id",
                    { oldMatrixSet4pc },
                  );
                }

                // Re-use a matrix if it exists
                const existingMatrix = newMatrixRepo.find(
                  (matrix) =>
                    matrix.typeId === typeId &&
                    matrix.definitionId === newDefinitionId &&
                    matrix.stars === oldMatrixSet4pc?.stars,
                );

                if (existingMatrix) {
                  newMatrixSlots[typeId].matrixId = existingMatrix.id;
                } else {
                  const newMatrix: MatrixDto = {
                    id: nanoid(),
                    characterId: newCharacterData.id,
                    typeId,
                    definitionId: newDefinitionId,
                    stars: oldMatrixSet4pc!.stars,
                  };
                  newMatrixRepo.push(newMatrix);
                  newMatrixSlots[typeId].matrixId = newMatrix.id;
                }
              }
            }

            const newWeaponPreset: WeaponPresetDto = {
              id: nanoid(),
              definitionId: oldWeapon.definitionId,
              characterId: newCharacterData.id,
              stars: oldWeapon.stars,
              matrixSlots: newMatrixSlots,
            };

            newWeaponPresetRepo.push(newWeaponPreset);
            newTeamPreset.weaponPresetIds.push(newWeaponPreset.id);
          }
        });

        newTeamPresetRepo.push(newTeamPreset);
      }

      // Migrate gear set
      const oldGearSet = loadout.gearSet;
      const newGearSet: GearSetDto = {
        id: oldGearSet.id,
        slots: {
          Helmet: { acceptsType: "Helmet", gearId: undefined },
          Eyepiece: { acceptsType: "Eyepiece", gearId: undefined },
          Spaulders: { acceptsType: "Spaulders", gearId: undefined },
          Gloves: { acceptsType: "Gloves", gearId: undefined },
          Bracers: { acceptsType: "Bracers", gearId: undefined },
          Armor: { acceptsType: "Armor", gearId: undefined },
          "Combat Engine": {
            acceptsType: "Combat Engine",
            gearId: undefined,
          },
          Belt: { acceptsType: "Belt", gearId: undefined },
          Legguards: { acceptsType: "Legguards", gearId: undefined },
          Boots: { acceptsType: "Boots", gearId: undefined },
          Exoskeleton: { acceptsType: "Exoskeleton", gearId: undefined },
          Microreactor: { acceptsType: "Microreactor", gearId: undefined },
        },
      };

      fillGear("Helmet");
      fillGear("Eyepiece");
      fillGear("Spaulders");
      fillGear("Gloves");
      fillGear("Bracers");
      fillGear("Armor");
      fillGear("Combat Engine");
      fillGear("Belt");
      fillGear("Legguards");
      fillGear("Boots");
      fillGear("Exoskeleton");
      fillGear("Microreactor");

      function fillGear(typeId: GearTypeId) {
        const oldGear = oldGearSet.gearsByTypeId[typeId];

        // The old gear set populates all gear with an empty gear instance when initialized. The new gear set has that gear type slot set to undefined. Use the presence of random stats to determine if the old gear is empty or not. Empty random stats = [undefined, undefined, undefined, undefined]. Filled randomStats = [RandomStat, undefined, undefined, undefined].
        const isOldGearEmpty = oldGear.randomStats.every((stat) => !stat);

        if (isOldGearEmpty) return;

        // Treat gear with same random stats as the same gear
        const existingGear = newGearRepo.find(
          (gear) =>
            gear.typeId === typeId &&
            gear.randomStats.every(
              (stat) =>
                !!oldGear.randomStats.find(
                  (oldStat) =>
                    (!stat && !oldStat) ||
                    (stat &&
                      oldStat &&
                      oldStat.typeId === stat.typeId &&
                      oldStat.value === stat.value),
                ),
            ),
        );

        if (existingGear) {
          newGearSet.slots[typeId].gearId = existingGear.id;
        } else {
          const newGear: GearDto = {
            id: oldGear.id,
            typeId,
            characterId: newCharacterData.id,
            rarity: oldGear.isAugmented ? "Titan" : "SSR", // Old gear only has is augmented field which can mean the gear is meant to be augmented or titan. Treat as titan gear as augmented and titan gear are functionally the same right now, and users are used to seeing red gear
            stars: oldGear.stars,
            randomStats: oldGear.randomStats,
            augmentStats: oldGear.augmentStats,
          };

          newGearRepo.push(newGear);
          newGearSet.slots[typeId].gearId = newGear.id;
        }
      }

      const newGearSetPreset: GearSetPresetDto = {
        id: nanoid(),
        characterId: newCharacterData.id,
        name: `${loadout.name} gear preset`,
        gearSet: newGearSet,
      };
      newGearSetPresetRepo.push(newGearSetPreset);

      // Migrate loadout
      const newCharacterPreset: CharacterPresetDto = {
        id: loadout.id,
        characterId: newCharacterData.id,
        teamPresetId: newTeamPreset.id,
        gearSetPresetId: newGearSetPreset.id,
        name: loadout.name,
        baseAttacks: {
          values: {
            Altered: 0,
            Flame: loadout.loadoutStats.flameAttack.baseAttack,
            Frost: loadout.loadoutStats.frostAttack.baseAttack,
            Physical: loadout.loadoutStats.physicalAttack.baseAttack,
            Volt: loadout.loadoutStats.voltAttack.baseAttack,
          },
        },
        critRateFlat: loadout.loadoutStats.critFlat,
      };
      newCharacterPresetRepo.push(newCharacterPreset);
    });

    // Write new data
    localStorage.setItem(
      newCharacterDataRepoKey,
      JSON.stringify(newCharacterDataRepo),
    );
    localStorage.setItem(
      newCharacterPresetRepoKey,
      JSON.stringify(newCharacterPresetRepo),
    );
    localStorage.setItem(
      newTeamPresetRepoKey,
      JSON.stringify(newTeamPresetRepo),
    );
    localStorage.setItem(
      newWeaponPresetRepoKey,
      JSON.stringify(newWeaponPresetRepo),
    );
    localStorage.setItem(newMatrixRepoKey, JSON.stringify(newMatrixRepo));
    localStorage.setItem(
      newGearSetPresetRepoKey,
      JSON.stringify(newGearSetPresetRepo),
    );
    localStorage.setItem(newGearRepoKey, JSON.stringify(newGearRepo));

    removeOldData();
  } catch (error) {
    // Clean up any new data we may have created so far
    localStorage.removeItem(newCharacterDataRepoKey);
    localStorage.removeItem(newCharacterPresetRepoKey);
    localStorage.removeItem(newTeamPresetRepoKey);
    localStorage.removeItem(newWeaponPresetRepoKey);
    localStorage.removeItem(newMatrixRepoKey);
    localStorage.removeItem(newGearSetPresetRepoKey);
    localStorage.removeItem(newGearRepoKey);

    logException(error);
    throw new DataMigrationError("Failed v3 to v4 data migration", oldData);
  }

  function removeOldData() {
    localStorage.removeItem(oldUserStatsKey);
    localStorage.removeItem(oldLoadoutsKey);
    localStorage.removeItem(oldGearComparerKey);
  }
}
