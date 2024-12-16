import type { Meta, StoryObj } from "@storybook/react";

import { RelicIcon } from "./RelicIcon";

const meta: Meta<typeof RelicIcon> = {
  component: RelicIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RelicIcon>;

export const Blank: Story = {};

export const Icon: Story = {
  args: { relicName: "Alternate Destiny" },
};
