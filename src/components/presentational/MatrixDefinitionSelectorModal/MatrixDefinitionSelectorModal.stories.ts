import type { Meta, StoryObj } from "@storybook/react";

import { matrixDefinitions } from "../../../definitions/matrices/matrix-definitions";
import { MatrixDefinitionSelectorModal } from "./MatrixDefinitionSelectorModal";

const meta: Meta<typeof MatrixDefinitionSelectorModal> = {
  title: "Matrix Definition Selector Modal",
  component: MatrixDefinitionSelectorModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MatrixDefinitionSelectorModal>;

export const Default: Story = {
  args: {
    matrixDefinitions: matrixDefinitions.allIds.map(
      (id) => matrixDefinitions.byId[id],
    ),
  },
};
