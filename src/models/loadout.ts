import BigNumber from 'bignumber.js';
import { nanoid } from 'nanoid';

import { defaultCritDamagePercent } from '../constants/damage-formula';
import type { CoreElementalType } from '../constants/elemental-type';
import type { GearName } from '../constants/gear-types';
import { calculateDamageMultiplier } from '../utils/damage-calculation-utils';
import { additiveSum } from '../utils/math-utils';
import { calculateCritPercentFromFlat } from '../utils/stat-calculation-utils';
import type { Dto } from './dto';
import { Gear } from './gear';
import type { GearSet, GearSetDtoV2 } from './gear-set';
import { LoadoutMatrixSetBuffs } from './loadout-matrix-set-buffs';
import type { LoadoutStatsDto } from './loadout-stats';
import { LoadoutStats } from './loadout-stats';
import { LoadoutWeaponBuffs } from './loadout-weapon-buffs';
import type { Persistable } from './persistable';
import type { Team, TeamDto } from './team';
import type { UserStats } from './user-stats';

export class Loadout implements Persistable<LoadoutDto> {
  private _id: string;
  private _userStats: UserStats;

  public name: string;
  public elementalType: CoreElementalType;
  public team: Team;
  public gearSet: GearSet;
  public loadoutStats: LoadoutStats;

  public readonly weaponBuffs: LoadoutWeaponBuffs;
  public readonly matrixSetBuffs: LoadoutMatrixSetBuffs;

  public constructor(
    name: string,
    elementalType: CoreElementalType,
    team: Team,
    gearSet: GearSet,
    userStats: UserStats
  ) {
    this._userStats = userStats;

    this._id = nanoid();
    this.name = name;
    this.elementalType = elementalType;
    this.team = team;
    this.gearSet = gearSet;
    this.loadoutStats = new LoadoutStats(this);

    this.weaponBuffs = new LoadoutWeaponBuffs(this);
    this.matrixSetBuffs = new LoadoutMatrixSetBuffs(this);
  }

  public get id() {
    return this._id;
  }

  public get damageMultiplier(): number {
    return calculateDamageMultiplier(
      BigNumber(this.loadoutStats.activeElementalAttack.baseAttack),
      BigNumber(this.attackPercentTotal),
      BigNumber(this.critPercentTotal),
      BigNumber(this.critDamageTotal),
      BigNumber(this.elementalDamageTotal)
    ).toNumber();
  }

  /** The damage multiplier of a specific piece of gear in the loadout, relative to the loadout's damage multiplier */
  public getGearValue(gearTypeId: GearName): number {
    const gear = this.gearSet.getGearByType(gearTypeId);

    const attackFlatWithoutGear = BigNumber(
      this.loadoutStats.activeElementalAttack.baseAttack
    ).minus(gear.getTotalAttackFlat(this.elementalType));

    const attackPercentWithoutGear = BigNumber(this.attackPercentTotal).minus(
      gear.getTotalAttackPercent(this.elementalType)
    );

    const critPercentWithoutGear = BigNumber(this.critPercentTotal)
      .minus(
        calculateCritPercentFromFlat(
          gear.getTotalCritFlat(),
          this._userStats.characterLevel
        )
      )
      .minus(gear.getTotalCritPercent());

    const critDamageWithoutGear = BigNumber(this.critDamageTotal);

    const elementalDamageWithoutGear = BigNumber(
      this.elementalDamageTotal
    ).minus(gear.getTotalElementalDamagePercent(this.elementalType));

    const multiplierWithoutGear = calculateDamageMultiplier(
      attackFlatWithoutGear,
      attackPercentWithoutGear,
      critPercentWithoutGear,
      critDamageWithoutGear,
      elementalDamageWithoutGear
    );

    return BigNumber(this.damageMultiplier)
      .dividedBy(multiplierWithoutGear)
      .minus(1)
      .toNumber();
  }

  /** The damage multiplier of the specified piece of gear if it replaces the loadout's corresponding piece of gear, relative to the loadout's damage multiplier */
  public getSubstituteGearValue(substituteGear: Gear): number {
    // Use the loadout's stats to calculate the damage multiplier by deducting whatever stats the original gear has with and adding whatever stats the substitute gear has
    const {
      elementalType,
      loadoutStats: {
        activeElementalAttack: { baseAttack },
      },
      attackPercentTotal,
      critPercentTotal,
      critDamageTotal,
      elementalDamageTotal,
    } = this;

    const { characterLevel } = this._userStats;

    const originalGear = this.gearSet.getGearByType(substituteGear.type.id);

    const attackFlat = BigNumber(baseAttack)
      .minus(originalGear.getTotalAttackFlat(elementalType))
      .plus(substituteGear.getTotalAttackFlat(elementalType));

    const attackPercent = BigNumber(attackPercentTotal)
      .minus(originalGear.getTotalAttackPercent(elementalType))
      .plus(substituteGear.getTotalAttackPercent(elementalType));

    const critPercent = BigNumber(critPercentTotal)
      .minus(
        calculateCritPercentFromFlat(
          originalGear.getTotalCritFlat(),
          characterLevel
        )
      )
      .minus(originalGear.getTotalCritPercent())
      .plus(
        calculateCritPercentFromFlat(
          substituteGear.getTotalCritFlat(),
          characterLevel
        )
      )
      .plus(substituteGear.getTotalCritPercent());

    const critDamage = BigNumber(critDamageTotal);

    const elementalDamage = BigNumber(elementalDamageTotal)
      .minus(originalGear.getTotalElementalDamagePercent(elementalType))
      .plus(substituteGear.getTotalElementalDamagePercent(elementalType));

    const loadoutDamageMultiplierWithReplacementGear =
      calculateDamageMultiplier(
        attackFlat,
        attackPercent,
        critPercent,
        critDamage,
        elementalDamage
      ).toNumber();

    return BigNumber(loadoutDamageMultiplierWithReplacementGear)
      .dividedBy(
        BigNumber(this.damageMultiplier).dividedBy(
          this.getGearValue(originalGear.type.id as GearName) + 1
        )
      )
      .minus(1)
      .toNumber();
  }

  /** Replaces the piece of gear in the gear set with the new piece of gear and updates the Loadout stats according to the difference between the new and old piece of gear */
  public replaceGear(gear: Gear) {
    const oldGear = this.gearSet.getGearByType(gear.type.id);
    this.gearSet.setGear(gear);

    const {
      flameAttack,
      frostAttack,
      physicalAttack,
      voltAttack,
      critFlat,
      critPercent,
    } = this.loadoutStats;

    const gearStatDifference = Gear.calculateStatDifference(oldGear, gear);

    const newFlameAttack = BigNumber(flameAttack.baseAttack)
      .plus(gearStatDifference.flameAttack)
      .toNumber();
    const newFrostAttack = BigNumber(frostAttack.baseAttack)
      .plus(gearStatDifference.frostAttack)
      .toNumber();
    const newPhysicalAttack = BigNumber(physicalAttack.baseAttack)
      .plus(gearStatDifference.physicalAttack)
      .toNumber();
    const newVoltAttack = BigNumber(voltAttack.baseAttack)
      .plus(gearStatDifference.voltAttack)
      .toNumber();

    const newCritFlat = BigNumber(critFlat)
      .plus(gearStatDifference.critFlat)
      .toNumber();
    const newCritPercent = BigNumber(critPercent)
      .plus(gearStatDifference.critPercent)
      .toNumber();

    flameAttack.baseAttack = newFlameAttack;
    frostAttack.baseAttack = newFrostAttack;
    physicalAttack.baseAttack = newPhysicalAttack;
    voltAttack.baseAttack = newVoltAttack;

    this.loadoutStats.critFlat = newCritFlat;
    this.loadoutStats.critPercent = newCritPercent;
  }

  /** Total attack% of the loadout's elemental type - accounting from all sources (gear and buffs) */
  public get attackPercentTotal(): number {
    return additiveSum([
      this.gearSet.getTotalAttackPercent(this.elementalType),
      this.attackBuffTotal,
    ]).toNumber();
  }

  /** Total crit rate% - accounting from all sources (loadoutStats, gear (crit%) and buffs) */
  public get critPercentTotal(): number {
    return additiveSum([
      calculateCritPercentFromFlat(
        this.loadoutStats.critFlat,
        this._userStats.characterLevel
      ),
      this.gearSet.getTotalCritPercent(),
      this.critRateBuffTotal,
    ]).toNumber();
  }

  /** Total crit dmg% - account from all sources (buffs) */
  public get critDamageTotal(): number {
    return additiveSum([
      defaultCritDamagePercent,
      this.critDamageBuffTotal,
    ]).toNumber();
  }

  /** Total dmg% of the loadout's elemental type - accounting from all sources (gear) */
  public get elementalDamageTotal(): number {
    return additiveSum([
      this.gearSet.getTotalDamagePercent(this.elementalType),
    ]).toNumber();
  }

  /** Total attack% buff of the loadout's elemental type that will be active in combat */
  public get attackBuffTotal(): number {
    const weaponAttackBuffValues = this.weaponBuffs.attackPercentBuffs.map(
      (buff) => buff.value
    );
    const matrixAttackBuffValues = this.matrixSetBuffs.attackPercentBuffs.map(
      (buff) => buff.value
    );

    return additiveSum(
      weaponAttackBuffValues.concat(matrixAttackBuffValues)
    ).toNumber();
  }

  /** Total crit rate% buff that will be active in combat */
  public get critRateBuffTotal(): number {
    const weaponCritRateBuffValues = this.weaponBuffs.critRateBuffs.map(
      (buff) => buff.value
    );
    const matrixCritRateBuffValues = this.matrixSetBuffs.critRateBuffs.map(
      (buff) => buff.value
    );

    return additiveSum(
      weaponCritRateBuffValues.concat(matrixCritRateBuffValues)
    ).toNumber();
  }

  /** Total crit damage% buff that will be active in combat */
  public get critDamageBuffTotal(): number {
    const matrixCritDamageBuffValues = this.matrixSetBuffs.critDamageBuffs.map(
      (buff) => buff.value
    );

    return additiveSum(matrixCritDamageBuffValues).toNumber();
  }

  public copyFromDto(dto: LoadoutDto): void {
    const { id, name, elementalType, team, gearSet, loadoutStats } = dto;

    this._id = id;
    this.name = name;
    this.elementalType = elementalType;
    this.team.copyFromDto(team);
    this.gearSet.copyFromDto(gearSet);
    this.loadoutStats.copyFromDto(loadoutStats);
  }

  public toDto(): LoadoutDto {
    const { id, name, elementalType, team, gearSet, loadoutStats } = this;

    return {
      id,
      name,
      elementalType,
      team: team.toDto(),
      gearSet: gearSet.toDto(),
      loadoutStats: loadoutStats.toDto(),
      version: 1,
    };
  }
}

export interface LoadoutDto extends Dto {
  id: string;
  name: string;
  elementalType: CoreElementalType;
  team: TeamDto;
  gearSet: GearSetDtoV2;
  loadoutStats: LoadoutStatsDto;
  version: 1;
}
