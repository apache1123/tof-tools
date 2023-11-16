import type { GearName } from '../constants/gear-types';
import type { Dto } from '../models/dto';
import type { Gear } from '../models/gear';
import type { GearSetDtoV2 } from '../models/gear-set';
import { GearSet } from '../models/gear-set';
import type { Loadout } from '../models/loadout';
import type { Persistable } from '../models/persistable';
import { type LoadoutsState } from './loadouts';

export class GearComparerState implements Persistable<GearComparerStateDto> {
  public selectedLoadoutIndex = 0;
  public selectedGearTypeId: GearName = 'Armor';

  private readonly _loadoutsState: LoadoutsState;
  private _replacementGearGearSet = new GearSet();

  public constructor(loadoutsState: LoadoutsState) {
    this._loadoutsState = loadoutsState;
  }

  public get selectedLoadout(): Loadout {
    const loadout: Loadout | undefined =
      this._loadoutsState.loadoutList[this.selectedLoadoutIndex]?.loadout;
    return loadout ? loadout : this._loadoutsState.loadoutList[0].loadout;
  }

  public get selectedLoadoutGear(): Gear {
    return this.selectedLoadout.gearSet.getGearByType(this.selectedGearTypeId);
  }

  public get replacementGear(): Gear {
    return this._replacementGearGearSet.getGearByType(this.selectedGearTypeId);
  }

  public copyFromDto(dto: GearComparerStateDto): void {
    const { selectedLoadoutIndex, selectedGearTypeId, replacementGearGearSet } =
      dto;
    this.selectedLoadoutIndex = selectedLoadoutIndex;
    this.selectedGearTypeId = selectedGearTypeId;
    this._replacementGearGearSet.copyFromDto(replacementGearGearSet);
  }

  public toDto(): GearComparerStateDto {
    const {
      selectedLoadoutIndex,
      selectedGearTypeId,
      _replacementGearGearSet,
    } = this;
    return {
      selectedLoadoutIndex,
      selectedGearTypeId,
      replacementGearGearSet: _replacementGearGearSet.toDto(),
      version: 1,
    };
  }
}

export interface GearComparerStateDto extends Dto {
  selectedLoadoutIndex: number;
  selectedGearTypeId: GearName;
  replacementGearGearSet: GearSetDtoV2;
  version: 1;
}
