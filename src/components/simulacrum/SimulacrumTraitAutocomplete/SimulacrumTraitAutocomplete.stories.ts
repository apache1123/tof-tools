import type { Meta, StoryObj } from "@storybook/react";

import { SimulacrumTraitAutocomplete } from "./SimulacrumTraitAutocomplete";

const meta: Meta<typeof SimulacrumTraitAutocomplete> = {
  component: SimulacrumTraitAutocomplete,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SimulacrumTraitAutocomplete>;

export const Default: Story = { args: { value: undefined } };

export const Selected: Story = {
  args: { value: "King" },
};
