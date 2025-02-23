import { getMatrixType } from "../../definitions/matrices/matrix-type";
import { MatrixSlot } from "../../models/matrix/matrix-slot";
import { MatrixSlots } from "../../models/matrix/matrix-slots";
import { exampleMatrix1 } from "./matrix";

export const exampleMatrixSlot = new MatrixSlot(getMatrixType("mind"));
exampleMatrixSlot.matrix = exampleMatrix1;

export const exampleEmptyMatrixSlot = new MatrixSlot(getMatrixType("mind"));

export const exampleMatrixSlots = new MatrixSlots();
exampleMatrixSlots.getSlot(exampleMatrix1.type.id).matrix = exampleMatrix1;
