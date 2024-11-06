import type { Meta, StoryObj } from "@storybook/react";

import { GearStarsSelector } from "./GearStarsSelector";

const meta: Meta<typeof GearStarsSelector> = {
  title: "Gear Stars Selector",
  component: GearStarsSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearStarsSelector>;

export const Initial: Story = {};
