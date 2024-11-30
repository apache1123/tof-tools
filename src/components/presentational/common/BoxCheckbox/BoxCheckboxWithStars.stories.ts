import type { Meta, StoryObj } from "@storybook/react";

import { BoxCheckboxWithStars } from "./BoxCheckboxWithStars";

const meta: Meta<typeof BoxCheckboxWithStars> = {
  title: "Box Checkbox with Stars",
  component: BoxCheckboxWithStars,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BoxCheckboxWithStars>;

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

export const CheckedWithStars: Story = {
  args: {
    isChecked: true,
    title: "Title",
    subtitle: "Subtitle",
    maxNumOfStars: 3,
    stars: 2,
  },
};
