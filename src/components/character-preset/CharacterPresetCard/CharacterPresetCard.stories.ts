import type { Meta, StoryObj } from "@storybook/react";

import { exampleCharacterPreset1 } from "../../__fixtures__/character-preset";
import { CharacterPresetCard } from "./CharacterPresetCard";

const meta: Meta<typeof CharacterPresetCard> = {
  component: CharacterPresetCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CharacterPresetCard>;

export const Default: Story = {
  args: { characterPreset: exampleCharacterPreset1 },
};
