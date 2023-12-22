import { nanoid } from 'nanoid';

import { maxCharacterLevel } from '../../../constants/character-level';
import { defaultCritDamagePercent } from '../../../constants/damage-formula';
import type { CoreElementalType } from '../../../constants/elemental-type';
import type { GearName } from '../../../constants/gear-types';
import type { ElementalAttackDto } from '../../../models/elemental-attack';
import type { GearDto } from '../../../models/gear';
import type { GearSetDtoV1, GearSetDtoV2 } from '../../../models/gear-set';
import type { LoadoutDto } from '../../../models/loadout';
import type { MatrixSetDto } from '../../../models/matrix-set';
import type { RandomStatDto } from '../../../models/random-stat';
import type { TeamDto } from '../../../models/team';
import type { WeaponDto } from '../../../models/weapon';
import type { GearComparerGearsStateDto } from '../../deprecated/gear-comparer-gear';
import type { GearComparerOptionsStateDto } from '../../deprecated/gear-comparer-options';
import type { GearSetsStateDto } from '../../deprecated/gear-sets';
import type { TeamsStateDto } from '../../deprecated/teams';
import type { GearComparerStateDto } from '../../gear-comparer';
import type { LoadoutsStateDto } from '../../loadouts';
import type {
  UserStatsStateDtoV1,
  UserStatsStateDtoV2,
} from '../../user-stats';

export function migrateTeamsGearSetsStatsToLoadouts() {
  const userStatsJson = localStorage.getItem('userStats');
  const gearSetsJson = localStorage.getItem('gearSets');
  const gearComparerOptionsJson = localStorage.getItem('gearComparerOptions');
  const gearComparerGearsJson = localStorage.getItem('gearComparerGears');
  const teamsJson = localStorage.getItem('teams');

  const oldUserStatsState = userStatsJson
    ? (JSON.parse(userStatsJson) as UserStatsStateDtoV1)
    : undefined;
  const oldGearSetsState = gearSetsJson
    ? (JSON.parse(gearSetsJson) as GearSetsStateDto)
    : undefined;
  const oldGearComparerOptionsState = gearComparerOptionsJson
    ? (JSON.parse(gearComparerOptionsJson) as GearComparerOptionsStateDto)
    : undefined;
  const oldGearComparerGearsState = gearComparerGearsJson
    ? (JSON.parse(gearComparerGearsJson) as GearComparerGearsStateDto)
    : undefined;
  const oldTeamsState = teamsJson
    ? (JSON.parse(teamsJson) as TeamsStateDto)
    : undefined;

  const newUserStatsState: UserStatsStateDtoV2 = {
    characterLevel: oldUserStatsState?.characterLevel ?? maxCharacterLevel,
    version: 2,
  };
  localStorage.setItem('userStats', JSON.stringify(newUserStatsState));

  const newLoadoutsState: LoadoutsStateDto = {
    loadoutList: [
      {
        loadout: newLoadoutWithTransferredStatsAndTeam('Flame'),
        isDefault: true,
      },
      {
        loadout: newLoadoutWithTransferredStatsAndTeam('Frost'),
        isDefault: true,
      },
      {
        loadout: newLoadoutWithTransferredStatsAndTeam('Physical'),
        isDefault: true,
      },
      {
        loadout: newLoadoutWithTransferredStatsAndTeam('Volt'),
        isDefault: true,
      },
    ],
    selectedLoadoutIndex: 0,
    version: 1,
  };
  transferOldGearSets();
  localStorage.setItem('loadouts', JSON.stringify(newLoadoutsState));

  const newGearComparerState: GearComparerStateDto = {
    selectedLoadoutIndex:
      oldGearComparerOptionsState?.selectedElementalType === 'Flame'
        ? 0
        : oldGearComparerOptionsState?.selectedElementalType === 'Frost'
        ? 1
        : oldGearComparerOptionsState?.selectedElementalType === 'Physical'
        ? 2
        : oldGearComparerOptionsState?.selectedElementalType === 'Volt'
        ? 3
        : 0,
    selectedGearTypeId: oldGearComparerGearsState?.GearA?.typeId ?? 'Armor',
    replacementGearGearSet: newGearSet(),
    version: 1,
  };
  transferOldReplacementGear();
  localStorage.setItem('gearComparer', JSON.stringify(newGearComparerState));

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
          const elementalType = oldGearSet.elementalType ?? 'Flame';

          let usingDefaultLoadout =
            !defaultElementalLoadoutFilled[elementalType];
          if (usingDefaultLoadout) {
            const defaultLoadout = newLoadoutsState.loadoutList.find(
              (loadout) =>
                loadout.loadout.elementalType === elementalType &&
                loadout.isDefault
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
      loadout: LoadoutDto
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
          'Combat Engine': newGearFromOld(
            oldGearSet.gearsByTypeId['Combat Engine']
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
    elementalType: CoreElementalType
  ): LoadoutDto {
    const loadout: LoadoutDto = {
      id: nanoid(),
      name: elementalType,
      elementalType: elementalType,
      team: {
        weapon1: undefined,
        weapon2: undefined,
        weapon3: undefined,
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
        version: 1,
      },
      version: 1,
    };

    if (oldUserStatsState) {
      const oldElementalStats = oldUserStatsState.statsByElement[elementalType];
      if (oldElementalStats) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const newElementalAttack = loadout.loadoutStats[
          `${elementalType.toLowerCase()}Attack`
        ] as ElementalAttackDto;
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

  function newGearSet(): GearSetDtoV2 {
    return {
      id: nanoid(),
      gearsByTypeId: {
        Helmet: newGear('Helmet'),
        Eyepiece: newGear('Eyepiece'),
        Spaulders: newGear('Spaulders'),
        Gloves: newGear('Gloves'),
        Bracers: newGear('Bracers'),
        Armor: newGear('Armor'),
        'Combat Engine': newGear('Combat Engine'),
        Belt: newGear('Belt'),
        Legguards: newGear('Legguards'),
        Boots: newGear('Boots'),
        Exoskeleton: newGear('Exoskeleton'),
        Microreactor: newGear('Microreactor'),
      },
      version: 2,
    };
  }

  function newGear(typeId: GearName): GearDto {
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

  function newGearFromOld(oldGear: GearDto): GearDto {
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
    oldRandomStats: (RandomStatDto | undefined)[]
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
    oldAugmentStats: RandomStatDto[] | undefined
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

  function newTeamFromOld(oldTeam: TeamDto): TeamDto {
    return {
      weapon1: oldTeam.weapon1 ? newWeaponFromOld(oldTeam.weapon1) : undefined,
      weapon2: oldTeam.weapon2 ? newWeaponFromOld(oldTeam.weapon2) : undefined,
      weapon3: oldTeam.weapon3 ? newWeaponFromOld(oldTeam.weapon3) : undefined,
      version: 1,
    };
  }

  function newWeaponFromOld(oldWeapon: WeaponDto): WeaponDto {
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

  function newMatrixSetFromOld(oldMatrixSet: MatrixSetDto): MatrixSetDto {
    return {
      definitionId: oldMatrixSet.definitionId,
      stars: oldMatrixSet.stars,
      version: 1,
    };
  }
}
