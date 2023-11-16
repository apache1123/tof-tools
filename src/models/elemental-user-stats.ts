import type { Dto } from './dto';

// export class ElementalUserStats implements Persistable<ElementalUserStatsDto> {
//   public baseAttackFlatWithGearA: number;
//   public totalAttackFlatWithGearA: number;
//   public critFlatWithGearA: number;
//   public critPercentWithGearA: number;
//   public critDamageWithGearA: number;
//   public otherGearElementalDamage: number;
//   public miscAttackPercent: number;
//   public miscCritRate: number;
//   public miscCritDamage: number;

//   public constructor() {
//     this.baseAttackFlatWithGearA = 0;
//     this.totalAttackFlatWithGearA = 0;
//     this.critFlatWithGearA = 0;
//     this.critPercentWithGearA = 0;
//     this.critDamageWithGearA = defaultCritDamagePercent;
//     this.otherGearElementalDamage = 0;
//     this.miscAttackPercent = 0;
//     this.miscCritRate = 0;
//     this.miscCritDamage = 0;
//   }

//   public copyFromDto(dto: ElementalUserStatsDto): void {
//     const {
//       baseAttackFlatWithGearA,
//       totalAttackFlatWithGearA,
//       critFlatWithGearA,
//       critPercentWithGearA,
//       critDamageWithGearA,
//       otherGearElementalDamage,
//       miscAttackPercent,
//       miscCritRate,
//       miscCritDamage,
//     } = dto;

//     this.baseAttackFlatWithGearA = baseAttackFlatWithGearA;
//     this.totalAttackFlatWithGearA = totalAttackFlatWithGearA;
//     this.critFlatWithGearA = critFlatWithGearA;
//     this.critPercentWithGearA = critPercentWithGearA;
//     this.critDamageWithGearA = critDamageWithGearA;
//     this.otherGearElementalDamage = otherGearElementalDamage;
//     this.miscAttackPercent = miscAttackPercent;
//     this.miscCritRate = miscCritRate;
//     this.miscCritDamage = miscCritDamage;
//   }

//   public toDto(): ElementalUserStatsDto {
//     const {
//       baseAttackFlatWithGearA,
//       totalAttackFlatWithGearA,
//       critFlatWithGearA,
//       critPercentWithGearA,
//       critDamageWithGearA,
//       otherGearElementalDamage,
//       miscAttackPercent,
//       miscCritRate,
//       miscCritDamage,
//     } = this;

//     return {
//       baseAttackFlatWithGearA,
//       totalAttackFlatWithGearA,
//       critFlatWithGearA,
//       critPercentWithGearA,
//       critDamageWithGearA,
//       otherGearElementalDamage,
//       miscAttackPercent,
//       miscCritRate,
//       miscCritDamage,
//       version: 1,
//     };
//   }
// }

/** @deprecated migrated to using Loadouts */
export interface ElementalUserStatsDto extends Dto {
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
