import type { Meta, StoryObj } from "@storybook/react";

import { exampleMatrix1 } from "../../../__fixtures__/matrix";
import { MatrixCard } from "./MatrixCard";

const meta: Meta<typeof MatrixCard> = {
  component: MatrixCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixCard>;

const matrix = exampleMatrix1;

export const Default: Story = {
  args: { matrix },
};

export const WithoutName: Story = {
  args: { matrix, showName: false },
};
