import type { Dto } from './dto';
import type { LoadoutStatsDto } from './loadout-stats';
import { LoadoutStats } from './loadout-stats';
import type { Persistable } from './persistable';
import { migrateToLatestVersion, type Migrations } from './versioned';

export class ElementalUserStats
  implements Persistable<ElementalUserStatsDtoV2>
{
  public loadoutStats: LoadoutStats;
  public otherGearElementalDamage: number;
  public miscAttackPercent: number;
  public miscCritRate: number;
  public miscCritDamage: number;

  public constructor(loadoutStats: LoadoutStats) {
    this.loadoutStats = loadoutStats;
    this.otherGearElementalDamage = 0;
    this.miscAttackPercent = 0;
    this.miscCritRate = 0;
    this.miscCritDamage = 0;
  }

  public copyFromDto(dto: ElementalUserStatsDto): void {
    const dtoV2 = migrateToLatestVersion<ElementalUserStatsDtoV2>(
      dto,
      elementalUserStatsDtoMigrations
    );

    const {
      loadoutStats,
      otherGearElementalDamage,
      miscAttackPercent,
      miscCritRate,
      miscCritDamage,
    } = dtoV2;

    this.loadoutStats = new LoadoutStats();
    this.loadoutStats.copyFromDto(loadoutStats);

    this.otherGearElementalDamage = otherGearElementalDamage;
    this.miscAttackPercent = miscAttackPercent;
    this.miscCritRate = miscCritRate;
    this.miscCritDamage = miscCritDamage;
  }

  public toDto(): ElementalUserStatsDtoV2 {
    const {
      loadoutStats,
      otherGearElementalDamage,
      miscAttackPercent,
      miscCritRate,
      miscCritDamage,
    } = this;

    return {
      loadoutStats: loadoutStats.toDto(),
      otherGearElementalDamage,
      miscAttackPercent,
      miscCritRate,
      miscCritDamage,
      version: 2,
    };
  }
}

export type ElementalUserStatsDto = Dto;

export interface ElementalUserStatsDtoV1 extends ElementalUserStatsDto {
  baseAttackFlatWithGearA: number;
  totalAttackFlatWithGearA: number;
  critFlatWithGearA: number;
  critPercentWithGearA: number;
  critDamageWithGearA: number;
  otherGearElementalDamage: number;
  miscAttackPercent: number;
  miscCritRate: number;
  miscCritDamage: number;
  version: 1;
}

export interface ElementalUserStatsDtoV2 extends ElementalUserStatsDto {
  loadoutStats: LoadoutStatsDto;
  otherGearElementalDamage: number;
  miscAttackPercent: number;
  miscCritRate: number;
  miscCritDamage: number;
  version: 2;
}

export const elementalUserStatsDtoMigrations: Migrations = [
  {
    version: 1,
    migrate: (dto: ElementalUserStatsDtoV1): ElementalUserStatsDtoV2 => {
      const {
        baseAttackFlatWithGearA,
        totalAttackFlatWithGearA,
        critFlatWithGearA,
        critPercentWithGearA,
        critDamageWithGearA,
        otherGearElementalDamage,
        miscAttackPercent,
        miscCritRate,
        miscCritDamage,
      } = dto;

      return {
        loadoutStats: {
          baseAttackFlat: baseAttackFlatWithGearA,
          totalAttackFlat: totalAttackFlatWithGearA,
          critFlat: critFlatWithGearA,
          critPercent: critPercentWithGearA,
          critDamage: critDamageWithGearA,
          version: 1,
        },
        otherGearElementalDamage,
        miscAttackPercent,
        miscCritRate,
        miscCritDamage,
        version: 2,
      };
    },
  },
];
