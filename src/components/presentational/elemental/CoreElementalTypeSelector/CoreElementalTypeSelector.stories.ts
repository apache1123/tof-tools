import type { Meta, StoryObj } from "@storybook/react";

import { CoreElementalTypeSelector } from "./CoreElementalTypeSelector";

const meta: Meta<typeof CoreElementalTypeSelector> = {
  component: CoreElementalTypeSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CoreElementalTypeSelector>;

export const Initial: Story = {};
