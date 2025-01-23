// import type { Dto } from "../models/dto";
// import { GearSet } from "../models/gear-set/gear-set";
// import type { LoadoutDtoV1, LoadoutDtoV2 } from "../models/loadout/loadout";
// import { Loadout } from "../models/loadout/loadout";
// import type { Persistable } from "../models/persistable";
// import { Team } from "../models/team/team";
// import type { CharacterInfo } from "../models/v4/character/character-info";
//
// export class LoadoutsState implements Persistable<LoadoutsStateDtoV2> {
//   public constructor(characterInfo: CharacterInfo) {
//     this.characterInfo = characterInfo;
//
//     this._loadoutList = [];
//     this._selectedLoadoutIndex = 0;
//
//     this.addDefaultLoadouts();
//   }
//
//   private _loadoutList: LoadoutListItem[];
//   private _selectedLoadoutIndex: number;
//   private characterInfo: CharacterInfo;
//
//   public get loadoutList() {
//     return this._loadoutList;
//   }
//
//   public get selectedLoadoutIndex() {
//     return this._selectedLoadoutIndex;
//   }
//
//   public set selectedLoadoutIndex(index: number) {
//     if (this.loadoutList[index]) {
//       this._selectedLoadoutIndex = index;
//     }
//   }
//
//   public get selectedLoadoutItem(): LoadoutListItem {
//     return this.loadoutList[this.selectedLoadoutIndex];
//   }
//
//   public get selectedLoadout(): Loadout {
//     return this.selectedLoadoutItem.loadout;
//   }
//
//   public addNewLoadout() {
//     const lastDefaultLoadoutIndex = this._loadoutList.findLastIndex(
//       (loadout) => loadout.isDefault,
//     );
//     const loadout = new Loadout(
//       `Custom Loadout ${this._loadoutList.length - lastDefaultLoadoutIndex}`,
//       new Team(),
//       GearSet.create(),
//     );
//     this._loadoutList.push({ loadout, isDefault: false });
//   }
//
//   public deleteSelectedLoadout() {
//     const { loadoutList, selectedLoadoutIndex, selectedLoadoutItem } = this;
//
//     if (selectedLoadoutItem.isDefault) return;
//
//     loadoutList.splice(selectedLoadoutIndex, 1);
//
//     // Adjust selected loadout index if necessary, to the last loadout
//     if (selectedLoadoutIndex >= loadoutList.length) {
//       this.selectedLoadoutIndex = loadoutList.length - 1;
//     }
//   }
//
//   public copyFromDto(dto: LoadoutsStateDtoV2): void {
//     const { loadoutList, selectedLoadoutIndex } = dto;
//
//     this._loadoutList = loadoutList.map((loadoutListItemDto) => {
//       const { loadout: loadoutDto, isDefault } = loadoutListItemDto;
//       const loadout = new Loadout(
//         loadoutDto.name,
//         new Team(),
//         GearSet.create(),
//       );
//       loadout.copyFromDto(loadoutDto);
//
//       return {
//         loadout,
//         isDefault,
//       };
//     });
//
//     this._selectedLoadoutIndex = selectedLoadoutIndex;
//   }
//
//   public toDto(): LoadoutsStateDtoV2 {
//     const { loadoutList, selectedLoadoutIndex } = this;
//
//     return {
//       loadoutList: loadoutList.map(({ loadout, isDefault }) => {
//         return {
//           loadout: loadout.toDto(),
//           isDefault,
//         };
//       }),
//       selectedLoadoutIndex,
//       version: 2,
//     };
//   }
//
//   private addDefaultLoadouts() {
//     const loadout1 = new Loadout("Flame", new Team(), GearSet.create());
//     const loadout2 = new Loadout("Frost", new Team(), GearSet.create());
//     const loadout3 = new Loadout("Physical", new Team(), GearSet.create());
//     const loadout4 = new Loadout("Volt", new Team(), GearSet.create());
//
//     this._loadoutList.push(
//       { loadout: loadout1, isDefault: true },
//       { loadout: loadout2, isDefault: true },
//       { loadout: loadout3, isDefault: true },
//       { loadout: loadout4, isDefault: true },
//     );
//   }
// }
//
import type { Dto } from "../db/repository/dto";
import type { LoadoutDtoV1 } from "../models/loadout/loadout";

// export interface LoadoutListItem {
//   loadout: Loadout;
//   isDefault: boolean;
// }

/** @deprecated */
export interface LoadoutListItemDtoV1 {
  loadout: LoadoutDtoV1;
  isDefault: boolean;
}

/** @deprecated */
export interface LoadoutsStateDtoV1 extends Dto {
  loadoutList: LoadoutListItemDtoV1[];
  selectedLoadoutIndex: number;
  version: 1;
}
