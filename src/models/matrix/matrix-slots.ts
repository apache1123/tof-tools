import { getMatrixType } from "../../definitions/matrices/matrix-type";
import { MatrixSlot } from "./matrix-slot";
import type { MatrixTypeId } from "./matrix-type";

export class MatrixSlots {
  public constructor(slots?: Record<MatrixTypeId, MatrixSlot>) {
    this._slots = slots ?? {
      mind: initializeMatrixSlot("mind"),
      memory: initializeMatrixSlot("memory"),
      belief: initializeMatrixSlot("belief"),
      emotion: initializeMatrixSlot("emotion"),
    };

    function initializeMatrixSlot(typeId: MatrixTypeId) {
      return new MatrixSlot(getMatrixType(typeId));
    }
  }

  private readonly _slots: Record<MatrixTypeId, MatrixSlot>;

  public getSlot(typeId: MatrixTypeId) {
    return this._slots[typeId];
  }

  public getSlots() {
    const { mind, memory, belief, emotion } = this._slots;
    return [mind, memory, belief, emotion];
  }

  /** Equip the matrix (or empty) from each slot of the given slots to this */
  public equipMatricesFrom(slots: MatrixSlots) {
    for (const slot of slots.getSlots()) {
      this.getSlot(slot.acceptsType.id).matrix = slot.matrix;
    }
  }
}
