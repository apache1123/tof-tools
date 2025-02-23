import type { Meta, StoryObj } from "@storybook/react";

import { matrixDefinitions } from "../../../definitions/matrices/matrix-definitions";
import { MatrixDefinitionSelector } from "./MatrixDefinitionSelector";

const meta: Meta<typeof MatrixDefinitionSelector> = {
  component: MatrixDefinitionSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixDefinitionSelector>;

export const Default: Story = {
  args: {
    matrixDefinitions: matrixDefinitions.allIds.map(
      (id) => matrixDefinitions.byId[id],
    ),
  },
};
