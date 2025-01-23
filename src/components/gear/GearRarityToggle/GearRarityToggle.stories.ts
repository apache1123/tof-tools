import type { Meta, StoryObj } from "@storybook/react";

import { GearRarityToggle } from "./GearRarityToggle";

const meta: Meta<typeof GearRarityToggle> = {
  component: GearRarityToggle,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearRarityToggle>;

export const Default: Story = { args: { value: "Augmented" } };
