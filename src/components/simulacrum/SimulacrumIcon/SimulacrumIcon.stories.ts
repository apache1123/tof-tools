import type { Meta, StoryObj } from "@storybook/react";

import { SimulacrumIcon } from "./SimulacrumIcon";

const meta: Meta<typeof SimulacrumIcon> = {
  component: SimulacrumIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SimulacrumIcon>;

export const Default: Story = {
  args: {
    simulacrumId: "Roslyn",
  },
};
