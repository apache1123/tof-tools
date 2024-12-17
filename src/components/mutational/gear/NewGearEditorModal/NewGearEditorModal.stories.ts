import type { Meta, StoryObj } from "@storybook/react";

import { exampleCharacterId } from "../../../__fixtures__/character";
import { NewGearEditorModal } from "./NewGearEditorModal";

const meta: Meta<typeof NewGearEditorModal> = {
  component: NewGearEditorModal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof NewGearEditorModal>;

export const Default: Story = {
  args: { characterId: exampleCharacterId },
};
