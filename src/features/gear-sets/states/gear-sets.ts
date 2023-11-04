import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { CoreElementalType } from '../../../constants/elemental-type';
import type { Data, DataById } from '../../../models/data';
import type { Dto } from '../../../models/dto';
import type { GearSetDto } from '../../../models/gear-set';
import { GearSet } from '../../../models/gear-set';
import type { Persistable } from '../../../models/persistable';

export const gearSetsStateKey = 'gearSets';

export class GearSetsState implements Persistable<GearSetsStateDto> {
  private _gearSets: Data<string, GearSet>;
  private _selectedGearSetIndex: number;

  public constructor() {
    this._gearSets = { allIds: [], byId: {} };
    this._selectedGearSetIndex = 0;

    const defaultGearSet = this.getDefaultGearSet();
    this._gearSets.allIds.push(defaultGearSet.id);
    this._gearSets.byId[defaultGearSet.id] = defaultGearSet;
  }

  public get gearSets() {
    return this._gearSets;
  }
  public addGearSet(gearSet: GearSet) {
    const { id } = gearSet;
    this._gearSets.allIds.push(id);
    this._gearSets.byId[id] = gearSet;
  }

  public get selectedGearSetIndex() {
    return this._selectedGearSetIndex;
  }
  public set selectedGearSetIndex(index: number) {
    if (this.gearSets.allIds[index]) {
      this._selectedGearSetIndex = index;
    }
  }

  public get selectedGearSet(): GearSet | undefined {
    const selectedGearSetId = this._gearSets.allIds[this._selectedGearSetIndex];
    if (selectedGearSetId) {
      return this._gearSets.byId[selectedGearSetId];
    }
    return undefined;
  }
  public get defaultNewGearSetName(): string {
    return getDefaultGearSetName(this._gearSets.allIds.length);
  }

  public setSelectedGearSetElementalType(elementalType: CoreElementalType) {
    const { selectedGearSet } = this;
    if (!selectedGearSet) return;

    selectedGearSet.elementalType = elementalType;
  }

  public deleteSelectedGearSet() {
    const {
      gearSets: { allIds, byId },
      selectedGearSetIndex,
      selectedGearSet,
    } = this;

    if (selectedGearSet) {
      allIds.splice(selectedGearSetIndex, 1);
      delete byId[selectedGearSet.id];
    }

    // Ensure there is always at least one default gear set
    if (!allIds.length) {
      this.addGearSet(this.getDefaultGearSet());
    }

    if (selectedGearSetIndex >= allIds.length) {
      this.selectedGearSetIndex = allIds.length - 1;
    }
  }

  private getDefaultGearSet() {
    const defaultGearSetName = getDefaultGearSetName(0);
    const defaultGearSet = new GearSet(defaultGearSetName);
    return defaultGearSet;
  }

  public copyFromDto(dto: GearSetsStateDto): void {
    const { gearSets, selectedGearSetIndex } = dto;

    this._gearSets = { allIds: [], byId: {} };

    this._gearSets.allIds = [...gearSets.allIds];
    Object.keys(gearSets.byId).forEach((id) => {
      const gearSetDto = gearSets.byId[id];
      const gearSet = new GearSet(gearSetDto.name);
      gearSet.copyFromDto(gearSetDto);
      this._gearSets.byId[id] = gearSet;
    });

    this._selectedGearSetIndex = selectedGearSetIndex;
  }

  public toDto(): GearSetsStateDto {
    const { gearSets, selectedGearSetIndex } = this;

    const gearSetDtosById: DataById<string, GearSetDto> = {};
    Object.keys(gearSets.byId).forEach((id) => {
      const gearSet = gearSets.byId[id];
      gearSetDtosById[gearSet.id] = gearSet.toDto();
    });

    return {
      gearSets: {
        allIds: [...gearSets.allIds],
        byId: gearSetDtosById,
      },
      selectedGearSetIndex,
      version: 1,
    };
  }
}

export interface GearSetsStateDto extends Dto {
  gearSets: Data<string, GearSetDto>;
  selectedGearSetIndex: number;
  version: 1;
}

export const gearSetsState = proxy<GearSetsState>(new GearSetsState());
devtools(gearSetsState, { name: gearSetsStateKey });

export function getDefaultGearSetName(gearSetIndex: number) {
  return `Set ${gearSetIndex + 1}`;
}
