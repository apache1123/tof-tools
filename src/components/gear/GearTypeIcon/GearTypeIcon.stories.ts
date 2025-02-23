import type { Meta, StoryObj } from "@storybook/react";

import { GearTypeIcon } from "./GearTypeIcon";

const meta: Meta<typeof GearTypeIcon> = {
  component: GearTypeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearTypeIcon>;

export const Default: Story = {
  args: { id: "Eyepiece", rarity: "SSR" },
};

export const Augmented: Story = {
  args: { id: "Eyepiece", rarity: "Augmented" },
};

export const Titan: Story = {
  args: { id: "Eyepiece", rarity: "Titan" },
};

export const MonochromeBlack: Story = {
  args: { id: "Eyepiece", monochromeBlack: true },
};

export const MonochromeWhite: Story = {
  args: { id: "Eyepiece", monochromeWhite: true },
};

export const Unknown: Story = {
  args: {},
};
