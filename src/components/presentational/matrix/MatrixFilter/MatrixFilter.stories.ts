import type { Meta, StoryObj } from "@storybook/react";

import { getMatrixDefinition } from "../../../../definitions/matrices/matrix-definitions";
import { MatrixFilter } from "./MatrixFilter";

const meta: Meta<typeof MatrixFilter> = {
  title: "Matrix Filter",
  component: MatrixFilter,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixFilter>;

export const Default: Story = {
  args: { filter: { definitions: [getMatrixDefinition("Alyss")] } },
};
