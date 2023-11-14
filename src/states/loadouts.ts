import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import type { Dto } from '../models/dto';
import { GearSet } from '../models/gear-set';
import type { LoadoutDto } from '../models/loadout';
import { Loadout } from '../models/loadout';
import type { Persistable } from '../models/persistable';
import { Team } from '../models/team';

export class LoadoutsState implements Persistable<LoadoutsStateDto> {
  private _loadoutList: LoadoutListItem[];
  private _selectedLoadoutIndex: number;

  public constructor() {
    this._loadoutList = [];
    this._selectedLoadoutIndex = 0;

    this.addDefaultLoadouts();
  }

  public get loadoutList() {
    return this._loadoutList;
  }

  public get selectedLoadoutIndex() {
    return this._selectedLoadoutIndex;
  }
  public set selectedLoadoutIndex(index: number) {
    if (this.loadoutList[index]) {
      this._selectedLoadoutIndex = index;
    }
  }

  public get selectedLoadoutItem(): LoadoutListItem {
    return this.loadoutList[this.selectedLoadoutIndex];
  }
  public get selectedLoadout(): Loadout {
    return this.selectedLoadoutItem.loadout;
  }

  public addNewLoadout() {
    const lastDefaultLoadoutIndex = this._loadoutList.findLastIndex(
      (loadout) => loadout.isDefault
    );
    const loadout = new Loadout(
      `Custom Loadout ${this._loadoutList.length - lastDefaultLoadoutIndex}`,
      'Flame',
      new Team(),
      new GearSet()
    );
    this._loadoutList.push({ loadout, isDefault: false });
  }

  public deleteSelectedLoadout() {
    const { loadoutList, selectedLoadoutIndex, selectedLoadoutItem } = this;

    if (selectedLoadoutItem.isDefault) return;

    loadoutList.splice(selectedLoadoutIndex, 1);

    // Adjust selected loadout index if necessary, to the last loadout
    if (selectedLoadoutIndex >= loadoutList.length) {
      this.selectedLoadoutIndex = loadoutList.length - 1;
    }
  }

  private addDefaultLoadouts() {
    const loadout1 = new Loadout('Flame', 'Flame', new Team(), new GearSet());
    const loadout2 = new Loadout('Frost', 'Frost', new Team(), new GearSet());
    const loadout3 = new Loadout(
      'Physical',
      'Physical',
      new Team(),
      new GearSet()
    );
    const loadout4 = new Loadout('Volt', 'Volt', new Team(), new GearSet());

    this._loadoutList.push(
      { loadout: loadout1, isDefault: true },
      { loadout: loadout2, isDefault: true },
      { loadout: loadout3, isDefault: true },
      { loadout: loadout4, isDefault: true }
    );
  }

  public copyFromDto(dto: LoadoutsStateDto): void {
    const { loadoutList, selectedLoadoutIndex } = dto;

    this._loadoutList = loadoutList.map((loadoutListItemDto) => {
      const { loadout: loadoutDto, isDefault } = loadoutListItemDto;
      const loadout = new Loadout(
        loadoutDto.name,
        loadoutDto.elementalType,
        new Team(),
        new GearSet()
      );
      loadout.copyFromDto(loadoutDto);

      return {
        loadout,
        isDefault,
      };
    });

    this._selectedLoadoutIndex = selectedLoadoutIndex;
  }

  public toDto(): LoadoutsStateDto {
    const { loadoutList, selectedLoadoutIndex } = this;

    return {
      loadoutList: loadoutList.map(({ loadout, isDefault }) => {
        return {
          loadout: loadout.toDto(),
          isDefault,
        };
      }),
      selectedLoadoutIndex,
      version: 1,
    };
  }
}

export interface LoadoutListItem {
  loadout: Loadout;
  isDefault: boolean;
}
export interface LoadoutListItemDto {
  loadout: LoadoutDto;
  isDefault: boolean;
}

export interface LoadoutsStateDto extends Dto {
  loadoutList: LoadoutListItemDto[];
  selectedLoadoutIndex: number;
  version: 1;
}

export const loadoutsStateKey = 'loadouts';
export const loadoutsState = proxy<LoadoutsState>(new LoadoutsState());
devtools(loadoutsState, { name: loadoutsStateKey });
