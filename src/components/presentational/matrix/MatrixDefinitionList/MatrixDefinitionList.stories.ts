import type { Meta, StoryObj } from "@storybook/react";

import { matrixDefinitions } from "../../../../definitions/matrices/matrix-definitions";
import { MatrixDefinitionList } from "./MatrixDefinitionList";

const meta: Meta<typeof MatrixDefinitionList> = {
  component: MatrixDefinitionList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixDefinitionList>;

export const Default: Story = {
  args: {
    matrixDefinitions: matrixDefinitions.allIds.map(
      (id) => matrixDefinitions.byId[id],
    ),
  },
};
