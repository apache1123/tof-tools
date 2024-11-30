import type { Meta, StoryObj } from "@storybook/react";

import { ElementalTypeIcon } from "./ElementalTypeIcon";

const meta: Meta<typeof ElementalTypeIcon> = {
  title: "Elemental Type Icon",
  component: ElementalTypeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ElementalTypeIcon>;

export const Initial: Story = {
  args: {
    elementalType: "Flame-Physical",
    width: 30,
    height: 30,
  },
};
