import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../../definitions/matrices/matrix-type";
import { Character } from "../../../../models/character/character";
import { Matrix } from "../../../../models/matrix/matrix";
import { MatrixSlotCard } from "./MatrixSlotCard";

const meta: Meta<typeof MatrixSlotCard> = {
  title: "Matrix Slot Card",
  component: MatrixSlotCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixSlotCard>;

export const WithoutMatrix: Story = {
  args: { type: getMatrixType("mind") },
};

export const WithMatrix: Story = {
  args: {
    type: getMatrixType("mind"),
    matrix: new Matrix(
      getMatrixType("mind"),
      getMatrixDefinition("Alyss"),
      new Character(),
    ),
  },
};
