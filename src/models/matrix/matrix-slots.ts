import { getMatrixType } from "../../definitions/matrices/matrix-type";
import type { MatrixBuffDefinition } from "../../definitions/types/matrix/matrix-buff-definition";
import { hasMetStarRequirement } from "../star-requirement";
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

  /** Buffs that can be activated for this matrix slots */
  public get buffDefinitions(): MatrixBuffDefinition[] {
    const matrices = this.getSlots().flatMap((slot) =>
      slot.matrix ? [slot.matrix] : [],
    );

    // Assuming if two matrices have the same buff definition, the buff definition points to the same object
    const results = new Set<MatrixBuffDefinition>();
    for (const matrix of matrices) {
      for (const buffDefinition of matrix.buffDefinitions) {
        const { starRequirement, minMatrixPieces } = buffDefinition;

        // Add buff definition if star and pieces requirements are met
        if (
          matrices.filter(
            (otherMatrix) =>
              otherMatrix.definitionId === matrix.definitionId &&
              hasMetStarRequirement(starRequirement, otherMatrix.stars),
          ).length >= minMatrixPieces
        ) {
          results.add(buffDefinition);
        }
      }
    }

    return [...results.values()];
  }

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
