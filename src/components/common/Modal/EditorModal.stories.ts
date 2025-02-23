import type { Meta, StoryObj } from "@storybook/react";

import { EditorModal } from "./EditorModal";

const meta: Meta<typeof EditorModal> = {
  component: EditorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof EditorModal>;

export const Default: Story = {
  args: {
    showDelete: true,
    fullWidth: true,
  },
};
