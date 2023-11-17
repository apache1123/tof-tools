import type { Dto } from '../../../models/dto';
import type { GearDto } from '../../../models/gear';

// GearA a.k.a "Current gear"; GearB a.k.a "New gear"
export type GearComparerGearPosition = 'GearA' | 'GearB';

// export class GearComparerGearsState
//   implements
//     Record<GearComparerGearPosition, Gear | undefined>,
//     Persistable<GearComparerGearsStateDto>
// {
//   public GearA: Gear | undefined;
//   public GearB: Gear | undefined;

//   public copyFromDto(dto: GearComparerGearsStateDto): void {
//     const { GearA: gearADto, GearB: gearBDto } = dto;

//     this.GearA = gearADto ? gearFromGearDto(gearADto) : undefined;
//     this.GearB = gearBDto ? gearFromGearDto(gearBDto) : undefined;

//     function gearFromGearDto(gearDto: GearDto): Gear {
//       const gearType = gearTypesLookup.byId[gearDto.typeId];
//       const gear = new Gear(gearType);
//       gear.copyFromDto(gearDto);
//       return gear;
//     }
//   }

//   public toDto(): GearComparerGearsStateDto {
//     const { GearA, GearB } = this;

//     return {
//       GearA: GearA?.toDto(),
//       GearB: GearB?.toDto(),
//       version: 1,
//     };
//   }
// }

/** @deprecated Migrated when switching to Loadouts */
export type GearComparerGearsStateDto = Record<
  GearComparerGearPosition,
  GearDto | undefined
> &
  Dto;

// export const gearComparerGearsStateKey = 'gearComparerGears';

// export const gearComparerGearsState = proxy<GearComparerGearsState>(
//   new GearComparerGearsState()
// );
// devtools(gearComparerGearsState, { name: gearComparerGearsStateKey });
