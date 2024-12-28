import type { Meta, StoryObj } from "@storybook/react";

import { MatrixSetPiecesSelector } from "./MatrixSetPiecesSelector";

const meta: Meta<typeof MatrixSetPiecesSelector> = {
  component: MatrixSetPiecesSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixSetPiecesSelector>;

export const Preselected2pc: Story = {
  args: {
    matrixSetPieces: 2,
  },
};

export const Preselected4pc: Story = {
  args: {
    matrixSetPieces: 4,
  },
};
