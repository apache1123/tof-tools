import type { Meta, StoryObj } from "@storybook/react";

import {
  exampleEmptyMatrixSlot,
  exampleMatrixSlot,
} from "../../__fixtures__/matrix-slot";
import { MatrixSlotCard } from "./MatrixSlotCard";

const meta: Meta<typeof MatrixSlotCard> = {
  component: MatrixSlotCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixSlotCard>;

export const WithoutMatrix: Story = {
  args: { type: exampleEmptyMatrixSlot.acceptsType },
};

export const WithMatrix: Story = {
  args: {
    type: exampleMatrixSlot.acceptsType,
    matrix: exampleMatrixSlot.matrix,
  },
};
