import type { Meta, StoryObj } from "@storybook/react";

import {
  exampleEmptyMatrixSlot,
  exampleMatrixSlot,
} from "../../__fixtures__/matrix-slot";
import { MatrixSlotIcon } from "./MatrixSlotIcon";

const meta: Meta<typeof MatrixSlotIcon> = {
  component: MatrixSlotIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixSlotIcon>;

export const WithoutMatrix: Story = {
  args: { type: exampleEmptyMatrixSlot.acceptsType },
};

export const WithMatrix: Story = {
  args: {
    type: exampleMatrixSlot.acceptsType,
    matrix: exampleMatrixSlot.matrix,
  },
};
