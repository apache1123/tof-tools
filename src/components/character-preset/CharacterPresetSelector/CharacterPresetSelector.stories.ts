import type { Meta, StoryObj } from "@storybook/react";

import { exampleCharacterPresets } from "../../__fixtures__/character-preset";
import { CharacterPresetSelector } from "./CharacterPresetSelector";

const meta: Meta<typeof CharacterPresetSelector> = {
  component: CharacterPresetSelector,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CharacterPresetSelector>;

export const Default: Story = {
  args: { presets: exampleCharacterPresets },
};

export const Empty: Story = {
  args: { presets: [] },
};
