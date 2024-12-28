import type { Meta, StoryObj } from "@storybook/react";

import { BoxCheckbox } from "./BoxCheckbox";

const meta: Meta<typeof BoxCheckbox> = {
  component: BoxCheckbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BoxCheckbox>;

export const Initial: Story = {
  args: {
    title: "Title",
    subtitle: "Subtitle",
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
    title: "Title",
    subtitle: "Subtitle",
  },
};
