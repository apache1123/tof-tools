import { getMatrixDefinition } from "../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../definitions/matrices/matrix-type";
import { Matrix } from "../../models/matrix/matrix";
import { exampleCharacterId } from "./character";

export const exampleMatrix = new Matrix(
  getMatrixType("mind"),
  getMatrixDefinition("Alyss"),
  exampleCharacterId,
);
exampleMatrix.stars = 2;
