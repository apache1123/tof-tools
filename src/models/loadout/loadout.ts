import BigNumber from "bignumber.js";
import { nanoid } from "nanoid";

import type { GearSetDtoV2 } from "../../db/repositories/gear/deprecated/gear-set-dto";
import type { GearSetDto } from "../../db/repositories/gear/dtos/gear-set-dto";
import type { TeamDtoV1 } from "../../db/repositories/team/deprecated/team-dto";
import type { TeamDto } from "../../db/repositories/team/team-dto";
import type { Dto } from "../../db/repository/dto";
import { defaultCritDamagePercent } from "../../definitions/damage-formula";
import type {
  CoreElementalType,
  WeaponElementalType,
} from "../../definitions/elemental-type";
import type { SimulacrumName } from "../../definitions/simulacra/simulacrum-name";
import { keysOf } from "../../utils/object-utils";
import type { CharacterId } from "../character/character";
import type { LoadoutStatsDto } from "../deprecated/loadout-stats";
import type { ElementalAttackFlatsDto } from "../elemental-attack-flats";
import { ElementalAttackFlats } from "../elemental-attack-flats";
import { Gear } from "../gear/gear";
import type { GearSet } from "../gear/gear-set";
import type { SimulacrumTrait } from "../simulacrum-trait";
import type { Team } from "../team/team";

/** A loadout is a preset combination of weapons & matrices (team), gear set, trait etc. */
export class Loadout {
  public constructor(
    public name: string,
    characterId: CharacterId,
    public team: Team,
    public gearSet: GearSet,
  ) {
    this._id = nanoid();
    this._characterId = characterId;
    this.useOverrideStats = false;
    this.overrideElementalAttackFlats = ElementalAttackFlats.create();
  }

  /** Use manually inputted stats for some of the stats instead of calculated stats */
  public useOverrideStats: boolean;
  public simulacrumTrait: SimulacrumTrait | undefined;

  private _id: string;
  private _characterId: CharacterId;
  private overrideElementalAttackFlats: ElementalAttackFlats;
  private _overrideCritRateFlat = 0;

  public get id() {
    return this._id;
  }

  public get characterId(): CharacterId {
    return this._characterId;
  }

  /** The effective crit rate flat to use, depending on if stats are being overridden or not */
  public get critRateFlat(): number {
    return this.useOverrideStats
      ? this.overrideCritRateFlat
      : this.calculatedCritRateFlat;
  }

  /** The calculated crit rate flat value */
  public get calculatedCritRateFlat(): number {
    return this.gearSet.getTotalCritRateFlat();
  }

  /** Specifically get the override crit rate flat value */
  public get overrideCritRateFlat(): number {
    return this._overrideCritRateFlat;
  }

  public set overrideCritRateFlat(value: number) {
    this._overrideCritRateFlat = value > 0 ? value : 0;
  }

  /** Base crit rate percent sum from all things the character has. Does not include converted crit rate flat */
  public get critRatePercent(): number {
    return this.gearSet.getTotalCritRatePercent();
  }

  public get critDamagePercent(): number {
    return defaultCritDamagePercent;
  }

  public get hpFlat(): number {
    return this.gearSet.getTotalHpFlat();
  }

  public get hpPercent(): number {
    return this.gearSet.getTotalHpPercent();
  }

  public static createCopy(loadout: Loadout): Loadout {
    const copy = new Loadout(
      loadout.name,
      loadout._characterId,
      loadout.team,
      loadout.gearSet,
    );
    copy.useOverrideStats = loadout.useOverrideStats;
    copy.overrideElementalAttackFlats = ElementalAttackFlats.createCopy(
      loadout.overrideElementalAttackFlats,
    );
    copy.overrideCritRateFlat = loadout.overrideCritRateFlat;
    return copy;
  }

  /** The effective elemental attack flat to use, depending on if stats are being overridden or not */
  public getAttackFlat(element: WeaponElementalType): number {
    return this.useOverrideStats
      ? this.getOverrideAttackFlat(element)
      : this.getCalculatedAttackFlat(element);
  }

  /** The calculated elemental attack flat value */
  public getCalculatedAttackFlat(element: WeaponElementalType): number {
    return this.gearSet.getTotalAttackFlat(element);
  }

  /** Specifically get the override attack flat value */
  public getOverrideAttackFlat(element: WeaponElementalType) {
    return this.overrideElementalAttackFlats.getAttackFlat(element);
  }

  public setOverrideAttackFlat(element: WeaponElementalType, value: number) {
    this.overrideElementalAttackFlats.setAttackFlat(element, value);
  }

  public getAttackPercent(element: WeaponElementalType): number {
    return this.gearSet.getTotalAttackPercent(element);
  }

  public getDamagePercent(element: WeaponElementalType): number {
    return this.gearSet.getTotalDamagePercent(element);
  }

  public getResistanceFlat(element: WeaponElementalType): number {
    return this.gearSet.getTotalResistanceFlat(element);
  }

  public getResistancePercent(element: WeaponElementalType): number {
    return this.gearSet.getTotalResistancePercent(element);
  }

  /** Replaces the piece of gear in the gear set with the new piece of gear and updates the stats if applicable */
  public replaceGear(gear: Gear) {
    const gearSlot = this.gearSet.getSlot(gear.type.id);
    const oldGear = gearSlot.gear;

    if (!oldGear) return;

    gearSlot.gear = gear;

    const gearStatDifference = Gear.calculateStatDifference(oldGear, gear);

    // Only base attacks and crit rate flat need to be updated as they are the only ones that are manually inputted
    keysOf(gearStatDifference.elementalAttackFlats).forEach((element) => {
      this.overrideElementalAttackFlats.setAttackFlat(
        element,
        BigNumber(this.overrideElementalAttackFlats.getAttackFlat(element))
          .plus(gearStatDifference.elementalAttackFlats[element])
          .toNumber(),
      );
    });

    this.overrideCritRateFlat = BigNumber(this.overrideCritRateFlat)
      .plus(gearStatDifference.critRateFlat)
      .toNumber();
  }

  // public copyFromDto(dto: LoadoutDtoV2): void {
  //   const {
  //     id,
  //     characterId,
  //     name,
  //     team,
  //     gearSet,
  //     simulacrumTraitId,
  //     useOverrideStats,
  //     overrideElementalAttackFlats,
  //     overrideCritRateFlat,
  //   } = dto;
  //
  //   this._id = id;
  //   this._characterId = characterId;
  //   this.name = name;
  //   this.team.copyFromDto(team);
  //   this.gearSet.copyFromDto(gearSet);
  //   this.simulacrumTrait = simulacrumTraitId
  //     ? simulacrumTraits.byId[simulacrumTraitId]
  //     : undefined;
  //   this.useOverrideStats = useOverrideStats;
  //   this.overrideElementalAttackFlats.copyFromDto(overrideElementalAttackFlats);
  //   this.overrideCritRateFlat = overrideCritRateFlat;
  // }
  //
  // public toDto(): LoadoutDtoV2 {
  //   const {
  //     id,
  //     characterId,
  //     name,
  //     team,
  //     gearSet,
  //     simulacrumTrait,
  //     useOverrideStats,
  //     overrideElementalAttackFlats,
  //     overrideCritRateFlat,
  //   } = this;
  //
  //   return {
  //     id,
  //     characterId,
  //     name,
  //     team: team.toDto(),
  //     gearSet: gearSet.toDto(),
  //     simulacrumTraitId: simulacrumTrait?.id,
  //     useOverrideStats,
  //     overrideElementalAttackFlats: overrideElementalAttackFlats.toDto(),
  //     overrideCritRateFlat,
  //     version: 2,
  //   };
  // }
}

export interface LoadoutDtoV2 extends Dto {
  id: string;
  characterId: string;
  name: string;
  team: TeamDto;
  gearSet: GearSetDto;
  simulacrumTraitId: SimulacrumName | undefined;
  useOverrideStats: boolean;
  overrideElementalAttackFlats: ElementalAttackFlatsDto;
  overrideCritRateFlat: number;
  version: 2;
}

/** @deprecated */
export interface LoadoutDtoV1 extends Dto {
  id: string;
  name: string;
  elementalType: CoreElementalType;
  team: TeamDtoV1;
  gearSet: GearSetDtoV2;
  loadoutStats: LoadoutStatsDto;
  simulacrumTraitId: SimulacrumName | undefined;
  version: 1;
}
