import type { BuffId } from '../../../definitions/types/buff/buff-ability';

/** To track what buffs have been utilized in combat. "Utilized" means the buff has been applied to any of the attacks in the sequence of attacks during combat.
 *
 * The use case for this is that there could be buffs present during the combat, but are not being used at all. e.g. frost buffs are active, but since all attacks are volt attacks they are not used
 */
export class UtilizedBuffs {
  private readonly utilizedBuffIds: Set<BuffId> = new Set();

  public add(id: BuffId) {
    this.utilizedBuffIds.add(id);
  }

  public has(id: BuffId) {
    return this.utilizedBuffIds.has(id);
  }

  /** Returns all utilized buffs */
  public get() {
    return [...this.utilizedBuffIds];
  }
}
