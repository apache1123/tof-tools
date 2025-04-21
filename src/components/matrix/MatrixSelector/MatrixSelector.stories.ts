import type { Meta, StoryObj } from "@storybook/react";

import { getAllMatrixDefinitions } from "../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../definitions/matrices/matrix-type";
import { Matrix } from "../../../models/matrix/matrix";
import { exampleCharacterId } from "../../__fixtures__/character";
import { MatrixSelector } from "./MatrixSelector";

const meta: Meta<typeof MatrixSelector> = {
  component: MatrixSelector,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixSelector>;

export const Default: Story = {
  args: {
    characterId: exampleCharacterId,
    matrices: generateMatrices(),
    matrixTypeId: "mind",
  },
};

function generateMatrices() {
  const matrices = [];
  for (let i = 0; i < 5; i++) {
    const matrix = new Matrix(
      getMatrixType("mind"),
      getAllMatrixDefinitions()[i],
      "characterId",
    );
    matrices.push(matrix);
  }
  return matrices;
}
