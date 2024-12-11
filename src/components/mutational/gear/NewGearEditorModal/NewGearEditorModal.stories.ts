import type { Meta, StoryObj } from "@storybook/react";

import { NewGearEditorModal } from "./NewGearEditorModal";

const meta: Meta<typeof NewGearEditorModal> = {
  title: "New Gear Editor Modal",
  component: NewGearEditorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof NewGearEditorModal>;

export const Default: Story = {
  args: { characterId: "characterId" },
};
