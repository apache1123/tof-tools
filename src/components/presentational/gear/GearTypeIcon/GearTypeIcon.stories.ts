import type { Meta, StoryObj } from "@storybook/react";

import { GearTypeIcon } from "./GearTypeIcon";

const meta: Meta<typeof GearTypeIcon> = {
  title: "Gear Type Icon",
  component: GearTypeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearTypeIcon>;

export const Default: Story = {
  args: { gearName: "Eyepiece" },
};

export const Unknown: Story = {
  args: {},
};

export const Titan: Story = {
  args: { gearName: "Eyepiece", isTitan: true },
};

export const MonochromeBlack: Story = {
  args: { gearName: "Eyepiece", monochromeBlack: true },
};

export const MonochromeWhite: Story = {
  args: { gearName: "Eyepiece", monochromeWhite: true },
};
