// import type { GearName } from "../definitions/gear-types";
// import type { Dto } from "../models/dto";
// import type { Gear } from "../models/gear/gear";
// import type { GearSetDtoV2 } from "../models/gear-set/gear-set";
// import { GearSet } from "../models/gear-set/gear-set";
// import type { Persistable } from "../models/persistable";
// import { type LoadoutsState } from "./loadouts";
//
// export class GearComparerState implements Persistable<GearComparerStateDto> {
//   public constructor(loadoutsState: LoadoutsState) {
//     this.loadoutsState = loadoutsState;
//   }
//
//   public selectedGearTypeId: GearName = "Armor";
//   public readonly loadoutsState: LoadoutsState;
//   private _replacementGearGearSet = GearSet.create();
//
//   public get selectedLoadoutGear(): Gear {
//     return this.loadoutsState.selectedLoadout.gearSet.getGearByType(
//       this.selectedGearTypeId,
//     );
//   }
//
//   public get selectedLoadoutGearValue(): number {
//     return this.loadoutsState.selectedLoadout.getGearValue(
//       this.selectedGearTypeId,
//     );
//   }
//
//   public get replacementGearGearSet(): GearSet {
//     return this._replacementGearGearSet;
//   }
//
//   public get replacementGear(): Gear {
//     return this._replacementGearGearSet.getGearByType(this.selectedGearTypeId);
//   }
//
//   public get replacementGearValue(): number {
//     return this.loadoutsState.selectedLoadout.getSubstituteGearValue(
//       this.replacementGear,
//     );
//   }
//
//   public copyFromDto(dto: GearComparerStateDto): void {
//     const { selectedGearTypeId, replacementGearGearSet } = dto;
//     this.selectedGearTypeId = selectedGearTypeId;
//     this._replacementGearGearSet.copyFromDto(replacementGearGearSet);
//   }
//
//   public toDto(): GearComparerStateDto {
//     const { selectedGearTypeId, _replacementGearGearSet } = this;
//     return {
//       selectedGearTypeId,
//       replacementGearGearSet: _replacementGearGearSet.toDto(),
//       version: 1,
//     };
//   }
// }
//
import type { GearSetDtoV2 } from "../db/repositories/gear/deprecated/gear-set-dto";
import type { Dto } from "../db/repository/dto";
import type { GearTypeId } from "../definitions/gear-types";

export interface GearComparerStateDto extends Dto {
  selectedGearTypeId: GearTypeId;
  replacementGearGearSet: GearSetDtoV2;
  version: 1;
}
