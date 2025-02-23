import { getMatrixDefinition } from "../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../definitions/matrices/matrix-type";
import { Matrix } from "../../models/matrix/matrix";
import { exampleCharacterId } from "./character";

export const exampleMatrix1 = new Matrix(
  getMatrixType("mind"),
  getMatrixDefinition("Alyss"),
  exampleCharacterId,
);
exampleMatrix1.stars = 2;

export const exampleMatrix2 = new Matrix(
  getMatrixType("mind"),
  getMatrixDefinition("Anka"),
  exampleCharacterId,
);

export const exampleMatrix3 = new Matrix(
  getMatrixType("memory"),
  getMatrixDefinition("Meryl Ironheart"),
  exampleCharacterId,
);

export const exampleAllMatrices = [
  exampleMatrix1,
  exampleMatrix2,
  exampleMatrix3,
];
