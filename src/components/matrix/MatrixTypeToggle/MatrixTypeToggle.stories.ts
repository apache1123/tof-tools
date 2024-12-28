import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixType } from "../../../definitions/matrices/matrix-type";
import { MatrixTypeToggle } from "./MatrixTypeToggle";

const meta: Meta<typeof MatrixTypeToggle> = {
  component: MatrixTypeToggle,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixTypeToggle>;

export const Default: Story = { args: { values: [getMatrixType("mind")] } };
