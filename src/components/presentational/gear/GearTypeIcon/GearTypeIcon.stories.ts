import type { Meta, StoryObj } from "@storybook/react";

import { GearTypeIcon } from "./GearTypeIcon";

const meta: Meta<typeof GearTypeIcon> = {
  component: GearTypeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearTypeIcon>;

export const Default: Story = {
  args: { id: "Eyepiece" },
};

export const Unknown: Story = {
  args: {},
};

export const Titan: Story = {
  args: { id: "Eyepiece", isTitan: true },
};

export const MonochromeBlack: Story = {
  args: { id: "Eyepiece", monochromeBlack: true },
};

export const MonochromeWhite: Story = {
  args: { id: "Eyepiece", monochromeWhite: true },
};
