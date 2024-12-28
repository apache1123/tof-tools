import type { Meta, StoryObj } from "@storybook/react";

import { ButtonModal } from "./ButtonModal";

const meta: Meta<typeof ButtonModal> = {
  component: ButtonModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ButtonModal>;

const buttonContent = "Button";

export const Default: Story = {
  args: { buttonContent },
};

export const OpenByDefault: Story = {
  args: {
    buttonContent,
    openByDefault: true,
  },
};
