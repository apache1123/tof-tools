import { defaultCritDamagePercent } from '../constants/damage-formula';
import type { Dto } from './dto';
import type { Persistable } from './persistable';

export class LoadoutStats implements Persistable<LoadoutStatsDto> {
  public baseAttackFlat: number;
  public totalAttackFlat: number;
  public critFlat: number;
  public critPercent: number;
  public critDamage: number;

  public constructor() {
    this.baseAttackFlat = 0;
    this.totalAttackFlat = 0;
    this.critFlat = 0;
    this.critPercent = 0;
    this.critDamage = defaultCritDamagePercent;
  }

  public copyFromDto(dto: LoadoutStatsDto): void {
    const {
      baseAttackFlat,
      totalAttackFlat,
      critFlat,
      critPercent,
      critDamage,
    } = dto;

    this.baseAttackFlat = baseAttackFlat;
    this.totalAttackFlat = totalAttackFlat;
    this.critFlat = critFlat;
    this.critPercent = critPercent;
    this.critDamage = critDamage;
  }

  public toDto(): LoadoutStatsDto {
    const {
      baseAttackFlat,
      totalAttackFlat,
      critFlat,
      critPercent,
      critDamage,
    } = this;

    return {
      baseAttackFlat,
      totalAttackFlat,
      critFlat,
      critPercent,
      critDamage,
      version: 1,
    };
  }
}

export interface LoadoutStatsDto extends Dto {
  baseAttackFlat: number;
  totalAttackFlat: number;
  critFlat: number;
  critPercent: number;
  critDamage: number;
  version: 1;
}
