import type { Meta, StoryObj } from "@storybook/react";

import { ImageSelect } from "./ImageSelect";

const meta: Meta<typeof ImageSelect> = {
  component: ImageSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImageSelect>;

export const Initial: Story = {};
