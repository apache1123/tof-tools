import type { Meta, StoryObj } from "@storybook/react";

import { GearTypeToggle } from "./GearTypeToggle";

const meta: Meta<typeof GearTypeToggle> = {
  title: "Gear Type Toggle",
  component: GearTypeToggle,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearTypeToggle>;

export const Exclusive: Story = {
  args: {
    values: ["Eyepiece"],
    exclusive: true,
  },
};

export const Multiple: Story = {
  args: {
    values: ["Eyepiece", "Armor"],
    exclusive: false,
  },
};

export const ExclusiveEnforceAtLeastOne: Story = {
  args: {
    values: ["Eyepiece"],
    exclusive: true,
    enforceAtLeastOne: true,
  },
};

export const MultipleEnforceAtLeastOne: Story = {
  args: {
    values: ["Eyepiece"],
    exclusive: false,
    enforceAtLeastOne: true,
  },
};
