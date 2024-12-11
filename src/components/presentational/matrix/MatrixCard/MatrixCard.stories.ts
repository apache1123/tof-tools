import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { getMatrixType } from "../../../../definitions/matrices/matrix-type";
import { Matrix } from "../../../../models/matrix/matrix";
import { MatrixCard } from "./MatrixCard";

const meta: Meta<typeof MatrixCard> = {
  title: "Matrix Card",
  component: MatrixCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixCard>;

const matrix = new Matrix(
  getMatrixType("mind"),
  getMatrixDefinition("Alyss"),
  "characterId",
);
matrix.stars = 2;

export const Default: Story = {
  args: { matrix },
};

export const WithoutName: Story = {
  args: { matrix, showName: false },
};
