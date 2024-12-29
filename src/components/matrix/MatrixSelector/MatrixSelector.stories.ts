import type { Meta, StoryObj } from "@storybook/react";

import { matrixDefinitions } from "../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../definitions/matrices/matrix-type";
import { Matrix } from "../../../models/matrix/matrix";
import { MatrixSelector } from "./MatrixSelector";

const meta: Meta<typeof MatrixSelector> = {
  component: MatrixSelector,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixSelector>;

export const Default: Story = {
  args: { open: false, matrices: generateMatrices() },
};

function generateMatrices() {
  const matrices = [];
  for (let i = 0; i < 5; i++) {
    const matrix = new Matrix(
      getMatrixType("mind"),
      matrixDefinitions.byId[matrixDefinitions.allIds[i]],
      "characterId",
    );
    matrices.push(matrix);
  }
  return matrices;
}
