import type { Meta, StoryObj } from "@storybook/react";

import { GearSetPreset } from "../../../models/gear/gear-set-preset";
import { exampleGearSet } from "../../__fixtures__/gear-set";
import { GearSetPresetSummaryCardList } from "./GearSetPresetSummaryCardList";

const meta: Meta<typeof GearSetPresetSummaryCardList> = {
  component: GearSetPresetSummaryCardList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSetPresetSummaryCardList>;

export const Default: Story = {
  args: { presets: generatePresets() },
};

function generatePresets() {
  const result = [];
  for (let i = 0; i < 5; i++) {
    const preset = new GearSetPreset("characterId", undefined, exampleGearSet);
    preset.name = `Preset Name ${i}`;
    result.push(preset);
  }
  return result;
}
