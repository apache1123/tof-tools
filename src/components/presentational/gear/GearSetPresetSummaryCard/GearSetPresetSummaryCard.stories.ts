import type { Meta, StoryObj } from "@storybook/react";

import { GearSetPreset } from "../../../../models/gear/gear-set-preset";
import { exampleGearSet } from "../__fixtures__/gear-set";
import { GearSetPresetSummaryCard } from "./GearSetPresetSummaryCard";

const meta: Meta<typeof GearSetPresetSummaryCard> = {
  component: GearSetPresetSummaryCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSetPresetSummaryCard>;

const preset = new GearSetPreset("characterId", undefined, exampleGearSet);
preset.name = "Preset Name";

export const Default: Story = {
  args: { preset },
};
