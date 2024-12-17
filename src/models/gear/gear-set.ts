import { nanoid } from "nanoid";

import type { WeaponElementalType } from "../../definitions/elemental-type";
import type { GearTypeId } from "../../definitions/gear-types";
import { getGearType, getGearTypeOrder } from "../../definitions/gear-types";
import { sum } from "../../utils/math-utils";
import { keysOf } from "../../utils/object-utils";
import type { Id } from "../identifiable";
import type { Gear } from "./gear";
import { GearSlot } from "./gear-slot";

export type GearSetId = Id;

export class GearSet {
  public constructor(id?: GearSetId) {
    this.id = id ?? nanoid();
    this.slots = {
      Helmet: initializeGearSlot("Helmet"),
      Eyepiece: initializeGearSlot("Eyepiece"),
      Spaulders: initializeGearSlot("Spaulders"),
      Gloves: initializeGearSlot("Gloves"),
      Bracers: initializeGearSlot("Bracers"),
      Armor: initializeGearSlot("Armor"),
      "Combat Engine": initializeGearSlot("Combat Engine"),
      Belt: initializeGearSlot("Belt"),
      Legguards: initializeGearSlot("Legguards"),
      Boots: initializeGearSlot("Boots"),
      Exoskeleton: initializeGearSlot("Exoskeleton"),
      Microreactor: initializeGearSlot("Microreactor"),
    };

    function initializeGearSlot(typeId: GearTypeId) {
      return new GearSlot(getGearType(typeId));
    }
  }

  public readonly id: GearSetId;
  private readonly slots: Record<GearTypeId, GearSlot>;

  public static createCopy(gearSet: GearSet): GearSet {
    const copy = new GearSet();

    for (const slot of gearSet.getSlots()) {
      const gear = slot.gear;
      if (gear) {
        copy.getSlot(gear.type.id).gear = gear;
      }
    }

    return copy;
  }

  public getSlot(typeId: GearTypeId) {
    return this.slots[typeId];
  }

  public getSlots() {
    return getGearTypeOrder().map((typeId) => this.slots[typeId]);
  }

  public getGears() {
    return this.getSlots().flatMap((slot) => (slot.gear ? [slot.gear] : []));
  }

  public getTotalAttackFlat(element: WeaponElementalType): number {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalAttackFlat(element),
    );
  }

  public getTotalAttackPercent(element: WeaponElementalType): number {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalAttackPercent(element),
    );
  }

  public getTotalDamagePercent(element: WeaponElementalType): number {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalElementalDamagePercent(element),
    );
  }

  /** Sum of all gears' crit rate flat stats */
  public getTotalCritRateFlat(): number {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalCritFlat(),
    );
  }

  /** Sum of all gears' crit rate % stat. Does not include converted crit rate flat stats */
  public getTotalCritRatePercent(): number {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalCritPercent(),
    );
  }

  public getTotalHpFlat() {
    return this.additiveSumStatValueOfAllGears((gear) => gear.getTotalHpFlat());
  }

  public getTotalHpPercent() {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalHpPercent(),
    );
  }

  public getTotalResistanceFlat(element: WeaponElementalType) {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalResistanceFlat(element),
    );
  }

  public getTotalResistancePercent(element: WeaponElementalType) {
    return this.additiveSumStatValueOfAllGears((gear) =>
      gear.getTotalResistancePercent(element),
    );
  }

  private additiveSumStatValueOfAllGears(
    statSelector: (gear: Gear) => number,
  ): number {
    return sum(
      ...keysOf(this.slots).map((typeId) => {
        const slot = this.getSlot(typeId);
        const gear = slot.gear;
        return gear ? statSelector(gear) : 0;
      }),
    ).toNumber();
  }
}
