import type { Meta, StoryObj } from "@storybook/react";

import { matrixTypes } from "../../../../definitions/matrices/matrix-type";
import { MatrixTypeIcon } from "./MatrixTypeIcon";

const meta: Meta<typeof MatrixTypeIcon> = {
  component: MatrixTypeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixTypeIcon>;

const { id, displayName } = matrixTypes[0];
export const Default: Story = {
  args: { id, displayName },
};
