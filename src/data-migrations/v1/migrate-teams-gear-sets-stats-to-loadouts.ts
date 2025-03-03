import { nanoid } from "nanoid";

import type { RandomStatDto } from "../../db/repositories/gear/dtos/random-stat-dto";
import { maxCharacterLevel } from "../../definitions/character-level";
import { defaultCritDamagePercent } from "../../definitions/damage-formula";
import type { CoreElementalType } from "../../definitions/elemental-type";
import type { GearTypeId } from "../../definitions/gear-types";
import { filterOutUndefined } from "../../utils/array-utils";
import type { ElementalAttackDtoV3 } from "../v3/deprecated/elemental-attack-dto";
import type { GearComparerStateDtoV3 } from "../v3/deprecated/gear-comparer-state-dto";
import type { GearDtoV3 } from "../v3/deprecated/gear-dto";
import type { GearSetDtoV3 } from "../v3/deprecated/gear-set-dto";
import type { LoadoutDtoV3 } from "../v3/deprecated/loadout-dto";
import type { LoadoutsStateDtoV3 } from "../v3/deprecated/loadouts-state-dto";
import type { MatrixSetDtoV3 } from "../v3/deprecated/matrix-set-dto";
import type { TeamDtoV3 } from "../v3/deprecated/team-dto";
import type { UserStatsStateDtoV3 } from "../v3/deprecated/user-stats-state-dto";
import type { WeaponDtoV3 } from "../v3/deprecated/weapon-dto";
import type { GearComparerGearsStateDtoV1 } from "./deprecated-dtos/gear-comparer-gears-state-dto";
import type { GearComparerOptionsStateDtoV1 } from "./deprecated-dtos/gear-comparer-options-state-dto";
import type { GearSetDtoV1 } from "./deprecated-dtos/gear-set-dto";
import type { GearSetsStateDtoV1 } from "./deprecated-dtos/gear-sets-state-dto";
import type { TeamsStateDtoV1 } from "./deprecated-dtos/teams-state-dto";
import type { UserStatsStateDtoV1 } from "./deprecated-dtos/user-stats-state-dto";

export function migrateTeamsGearSetsStatsToLoadouts() {
  const userStatsKey = "userStats";
  const gearSetsKey = "gearSets";
  const gearComparerOptionsKey = "gearComparerOptions";
  const gearComparerGearsKey = "gearComparerGears";
  const teamsKey = "teams";

  const userStatsJson = localStorage.getItem(userStatsKey);
  const gearSetsJson = localStorage.getItem(gearSetsKey);
  const gearComparerOptionsJson = localStorage.getItem(gearComparerOptionsKey);
  const gearComparerGearsJson = localStorage.getItem(gearComparerGearsKey);
  const teamsJson = localStorage.getItem(teamsKey);

  const oldUserStatsState = userStatsJson
    ? (JSON.parse(userStatsJson) as UserStatsStateDtoV1)
    : undefined;
  const oldGearSetsState = gearSetsJson
    ? (JSON.parse(gearSetsJson) as GearSetsStateDtoV1)
    : undefined;
  const oldGearComparerOptionsState = gearComparerOptionsJson
    ? (JSON.parse(gearComparerOptionsJson) as GearComparerOptionsStateDtoV1)
    : undefined;
  const oldGearComparerGearsState = gearComparerGearsJson
    ? (JSON.parse(gearComparerGearsJson) as GearComparerGearsStateDtoV1)
    : undefined;
  const oldTeamsState = teamsJson
    ? (JSON.parse(teamsJson) as TeamsStateDtoV1)
    : undefined;

  // No need to migrate anything if there aren't any old gear sets
  if (!oldGearSetsState) return;

  const newUserStatsState: UserStatsStateDtoV3 = {
    characterLevel: oldUserStatsState?.characterLevel ?? maxCharacterLevel,
    version: 2,
  };
  localStorage.setItem(userStatsKey, JSON.stringify(newUserStatsState));

  const newLoadoutsState: LoadoutsStateDtoV3 = {
    loadoutList: [
      {
        loadout: newLoadoutWithTransferredStatsAndTeam("Flame"),
        isDefault: true,
      },
      {
        loadout: newLoadoutWithTransferredStatsAndTeam("Frost"),
        isDefault: true,
      },
      {
        loadout: newLoadoutWithTransferredStatsAndTeam("Physical"),
        isDefault: true,
      },
      {
        loadout: newLoadoutWithTransferredStatsAndTeam("Volt"),
        isDefault: true,
      },
    ],
    selectedLoadoutIndex:
      oldGearComparerOptionsState?.selectedElementalType === "Flame"
        ? 0
        : oldGearComparerOptionsState?.selectedElementalType === "Frost"
          ? 1
          : oldGearComparerOptionsState?.selectedElementalType === "Physical"
            ? 2
            : oldGearComparerOptionsState?.selectedElementalType === "Volt"
              ? 3
              : 0,
    version: 1,
  };
  transferOldGearSets();
  localStorage.setItem("loadouts", JSON.stringify(newLoadoutsState));

  const newGearComparerState: GearComparerStateDtoV3 = {
    selectedGearTypeId: oldGearComparerGearsState?.GearA?.typeId ?? "Armor",
    replacementGearGearSet: newGearSet(),
    version: 1,
  };
  transferOldReplacementGear();
  localStorage.setItem("gearComparer", JSON.stringify(newGearComparerState));

  localStorage.removeItem(gearSetsKey);
  localStorage.removeItem(gearComparerOptionsKey);
  localStorage.removeItem(gearComparerGearsKey);
  localStorage.removeItem(teamsKey);

  function transferOldGearSets() {
    if (oldGearSetsState) {
      // Fill default elemental loadouts with old gear sets.
      // If there are more than one gear sets for the same elemental type, the first one will be used as default, subsequent ones will be custom loadouts
      const defaultElementalLoadoutFilled: Record<CoreElementalType, boolean> =
        {
          Flame: false,
          Frost: false,
          Physical: false,
          Volt: false,
        };

      oldGearSetsState.gearSets.allIds.forEach((gearSetId) => {
        const oldGearSet: GearSetDtoV1 | undefined =
          oldGearSetsState.gearSets.byId[gearSetId];

        if (oldGearSet) {
          // Default to Flame if gear set elemental type was not chosen
          const elementalType = oldGearSet.elementalType ?? "Flame";

          let usingDefaultLoadout =
            !defaultElementalLoadoutFilled[elementalType];
          if (usingDefaultLoadout) {
            const defaultLoadout = newLoadoutsState.loadoutList.find(
              (loadout) =>
                loadout.loadout.elementalType === elementalType &&
                loadout.isDefault,
            )?.loadout;

            if (defaultLoadout) {
              transferOldGearSetToLoadout(oldGearSet, defaultLoadout);
              defaultElementalLoadoutFilled[elementalType] = true;
            } else {
              usingDefaultLoadout = false;
            }
          }

          if (!usingDefaultLoadout) {
            const customLoadout =
              newLoadoutWithTransferredStatsAndTeam(elementalType);
            transferOldGearSetToLoadout(oldGearSet, customLoadout);

            newLoadoutsState.loadoutList.push({
              loadout: customLoadout,
              isDefault: false,
            });
          }
        }
      });
    }

    function transferOldGearSetToLoadout(
      oldGearSet: GearSetDtoV1,
      loadout: LoadoutDtoV3,
    ) {
      loadout.name = oldGearSet.name;

      loadout.gearSet = {
        id: nanoid(),
        gearsByTypeId: {
          Helmet: newGearFromOld(oldGearSet.gearsByTypeId.Helmet),
          Eyepiece: newGearFromOld(oldGearSet.gearsByTypeId.Eyepiece),
          Spaulders: newGearFromOld(oldGearSet.gearsByTypeId.Spaulders),
          Gloves: newGearFromOld(oldGearSet.gearsByTypeId.Gloves),
          Bracers: newGearFromOld(oldGearSet.gearsByTypeId.Bracers),
          Armor: newGearFromOld(oldGearSet.gearsByTypeId.Armor),
          "Combat Engine": newGearFromOld(
            oldGearSet.gearsByTypeId["Combat Engine"],
          ),
          Belt: newGearFromOld(oldGearSet.gearsByTypeId.Belt),
          Legguards: newGearFromOld(oldGearSet.gearsByTypeId.Legguards),
          Boots: newGearFromOld(oldGearSet.gearsByTypeId.Boots),
          Exoskeleton: newGearFromOld(oldGearSet.gearsByTypeId.Exoskeleton),
          Microreactor: newGearFromOld(oldGearSet.gearsByTypeId.Microreactor),
        },
        version: 2,
      };
    }
  }

  function transferOldReplacementGear() {
    if (oldGearComparerGearsState?.GearB) {
      newGearComparerState.replacementGearGearSet.gearsByTypeId[
        oldGearComparerGearsState.GearB.typeId
      ] = newGearFromOld(oldGearComparerGearsState.GearB);
    }
  }

  function newLoadoutWithTransferredStatsAndTeam(
    elementalType: CoreElementalType,
  ): LoadoutDtoV3 {
    const loadout: LoadoutDtoV3 = {
      id: nanoid(),
      name: elementalType,
      elementalType: elementalType,
      team: {
        weapon1: undefined,
        weapon2: undefined,
        weapon3: undefined,
        weapons: [],
        version: 1,
      },
      gearSet: newGearSet(),
      loadoutStats: {
        flameAttack: { baseAttack: 0, totalAttack: 0, version: 1 },
        frostAttack: { baseAttack: 0, totalAttack: 0, version: 1 },
        physicalAttack: { baseAttack: 0, totalAttack: 0, version: 1 },
        voltAttack: { baseAttack: 0, totalAttack: 0, version: 1 },
        critFlat: 0,
        critPercent: 0,
        critDamage: defaultCritDamagePercent,
        hp: 0,
        elementalResistances: {
          Altered: 0,
          Flame: 0,
          Frost: 0,
          Physical: 0,
          Volt: 0,
        },
        version: 1,
      },
      simulacrumTraitId: undefined,
      version: 1,
    };

    if (oldUserStatsState) {
      const oldElementalStats = oldUserStatsState.statsByElement[elementalType];
      if (oldElementalStats) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const newElementalAttack = loadout.loadoutStats[
          `${elementalType.toLowerCase()}Attack`
        ] as ElementalAttackDtoV3;
        if (newElementalAttack) {
          newElementalAttack.baseAttack =
            oldElementalStats.baseAttackFlatWithGearA;
          newElementalAttack.totalAttack =
            oldElementalStats.totalAttackFlatWithGearA;
        }

        loadout.loadoutStats.critFlat = oldElementalStats.critFlatWithGearA;
        loadout.loadoutStats.critPercent =
          oldElementalStats.critPercentWithGearA;
        loadout.loadoutStats.critDamage = oldElementalStats.critDamageWithGearA;
      }
    }

    if (oldTeamsState) {
      const oldTeam = oldTeamsState.teamsByElement[elementalType];
      if (oldTeam) {
        loadout.team = newTeamFromOld(oldTeam);
      }
    }

    return loadout;
  }

  function newGearSet(): GearSetDtoV3 {
    return {
      id: nanoid(),
      gearsByTypeId: {
        Helmet: newGear("Helmet"),
        Eyepiece: newGear("Eyepiece"),
        Spaulders: newGear("Spaulders"),
        Gloves: newGear("Gloves"),
        Bracers: newGear("Bracers"),
        Armor: newGear("Armor"),
        "Combat Engine": newGear("Combat Engine"),
        Belt: newGear("Belt"),
        Legguards: newGear("Legguards"),
        Boots: newGear("Boots"),
        Exoskeleton: newGear("Exoskeleton"),
        Microreactor: newGear("Microreactor"),
      },
      version: 2,
    };
  }

  function newGear(typeId: GearTypeId): GearDtoV3 {
    return {
      id: nanoid(),
      typeId,
      stars: 0,
      randomStats: [undefined, undefined, undefined, undefined],
      augmentStats: [],
      isAugmented: false,
      version: 1,
    };
  }

  function newGearFromOld(oldGear: GearDtoV3): GearDtoV3 {
    return {
      id: nanoid(),
      typeId: oldGear.typeId,
      stars: oldGear.stars,
      randomStats: newRandomStatsFromOld(oldGear.randomStats),
      augmentStats: newAugmentStatsFromOld(oldGear.augmentStats),
      isAugmented: oldGear.isAugmented,
      version: 1,
    };
  }

  function newRandomStatsFromOld(
    oldRandomStats: (RandomStatDto | undefined)[],
  ): (RandomStatDto | undefined)[] {
    return oldRandomStats.map((oldRandomStat) => {
      return oldRandomStat
        ? {
            typeId: oldRandomStat.typeId,
            value: oldRandomStat.value,
            augmentIncreaseValue: oldRandomStat.augmentIncreaseValue,
            version: 1,
          }
        : undefined;
    });
  }

  function newAugmentStatsFromOld(
    oldAugmentStats: RandomStatDto[] | undefined,
  ): RandomStatDto[] | undefined {
    return oldAugmentStats
      ? oldAugmentStats.map((oldAugmentStat) => {
          return {
            typeId: oldAugmentStat.typeId,
            value: oldAugmentStat.value,
            augmentIncreaseValue: oldAugmentStat.augmentIncreaseValue,
            version: 1,
          };
        })
      : undefined;
  }

  function newTeamFromOld(oldTeam: TeamDtoV3): TeamDtoV3 {
    const weapon1 = oldTeam.weapon1
      ? newWeaponFromOld(oldTeam.weapon1)
      : undefined;
    const weapon2 = oldTeam.weapon2
      ? newWeaponFromOld(oldTeam.weapon2)
      : undefined;
    const weapon3 = oldTeam.weapon3
      ? newWeaponFromOld(oldTeam.weapon3)
      : undefined;

    const weapons = filterOutUndefined([weapon1, weapon2, weapon3]);

    return {
      weapon1: weapon1,
      weapon2: weapon2,
      weapon3: weapon3,
      weapons,
      version: 1,
    };
  }

  function newWeaponFromOld(oldWeapon: WeaponDtoV3): WeaponDtoV3 {
    return {
      definitionId: oldWeapon.definitionId,
      stars: oldWeapon.stars,
      matrixSets: {
        matrixSet2pc1: oldWeapon.matrixSets.matrixSet2pc1
          ? newMatrixSetFromOld(oldWeapon.matrixSets.matrixSet2pc1)
          : undefined,
        matrixSet2pc2: oldWeapon.matrixSets.matrixSet2pc2
          ? newMatrixSetFromOld(oldWeapon.matrixSets.matrixSet2pc2)
          : undefined,
        matrixSet4pc: oldWeapon.matrixSets.matrixSet4pc
          ? newMatrixSetFromOld(oldWeapon.matrixSets.matrixSet4pc)
          : undefined,
        version: 1,
      },
      version: 1,
    };
  }

  function newMatrixSetFromOld(oldMatrixSet: MatrixSetDtoV3): MatrixSetDtoV3 {
    return {
      definitionId: oldMatrixSet.definitionId,
      stars: oldMatrixSet.stars,
      version: 1,
    };
  }
}
