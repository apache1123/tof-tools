import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../../definitions/matrices/matrix-type";
import { Matrix } from "../../../../models/matrix/matrix";
import { MatrixSlotIcon } from "./MatrixSlotIcon";

const meta: Meta<typeof MatrixSlotIcon> = {
  component: MatrixSlotIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixSlotIcon>;

export const WithoutMatrix: Story = {
  args: { type: getMatrixType("mind") },
};

export const WithMatrix: Story = {
  args: {
    type: getMatrixType("mind"),
    matrix: new Matrix(
      getMatrixType("mind"),
      getMatrixDefinition("Alyss"),
      "characterId",
    ),
  },
};
