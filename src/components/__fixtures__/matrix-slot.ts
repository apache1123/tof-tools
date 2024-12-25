import { getMatrixType } from "../../definitions/matrices/matrix-type";
import { MatrixSlot } from "../../models/matrix/matrix-slot";
import { MatrixSlots } from "../../models/matrix/matrix-slots";
import { exampleMatrix } from "./matrix";

export const exampleMatrixSlot = new MatrixSlot(getMatrixType("mind"));
exampleMatrixSlot.matrix = exampleMatrix;

export const exampleEmptyMatrixSlot = new MatrixSlot(getMatrixType("mind"));

export const exampleMatrixSlots = new MatrixSlots();
exampleMatrixSlots.getSlot(exampleMatrix.type.id).matrix = exampleMatrix;
