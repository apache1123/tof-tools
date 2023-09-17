import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { gearTypesLookup } from '../../../constants/gear-types';
import type { GearDTO } from '../../../models/gear';
import { Gear } from '../../../models/gear';
import type { Persistable } from '../../../models/persistable';

// GearA a.k.a "Current gear"; GearB a.k.a "New gear"
export type GearComparerGearPosition = 'GearA' | 'GearB';

export class GearComparerGearsState
  implements
    Record<GearComparerGearPosition, Gear | undefined>,
    Persistable<GearComparerGearsStateDTO>
{
  public GearA: Gear | undefined;
  public GearB: Gear | undefined;

  public copyFromDTO(dto: GearComparerGearsStateDTO): void {
    const { GearA: gearADto, GearB: gearBDto } = dto;

    this.GearA = gearADto ? gearFromGearDTO(gearADto) : undefined;
    this.GearB = gearBDto ? gearFromGearDTO(gearBDto) : undefined;

    function gearFromGearDTO(gearDTO: GearDTO): Gear {
      const gearType = gearTypesLookup.byId[gearDTO.typeId];
      const gear = new Gear(gearType);
      gear.copyFromDTO(gearDTO);
      return gear;
    }
  }

  public toDTO(): GearComparerGearsStateDTO {
    const { GearA, GearB } = this;

    return {
      GearA: GearA?.toDTO(),
      GearB: GearB?.toDTO(),
    };
  }
}

export type GearComparerGearsStateDTO = Record<
  GearComparerGearPosition,
  GearDTO | undefined
>;

export const gearComparerGearsStateKey = 'gearComparerGears';

export const gearComparerGearsState = proxy<GearComparerGearsState>(
  new GearComparerGearsState()
);
devtools(gearComparerGearsState, { name: gearComparerGearsStateKey });
