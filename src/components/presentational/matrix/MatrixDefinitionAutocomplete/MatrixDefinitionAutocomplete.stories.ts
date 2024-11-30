import type { Meta, StoryObj } from "@storybook/react";

import { getAllMatrixDefinitions } from "../../../../definitions/matrices/matrix-definitions";
import { MatrixDefinitionAutocomplete } from "./MatrixDefinitionAutocomplete";

const meta: Meta<typeof MatrixDefinitionAutocomplete> = {
  title: "Matrix Definition Autocomplete",
  component: MatrixDefinitionAutocomplete,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MatrixDefinitionAutocomplete>;

const options = getAllMatrixDefinitions();

export const Default: Story = { args: { options, values: [] } };

export const Values: Story = {
  args: { options, values: [options[0], options[1]] },
};
