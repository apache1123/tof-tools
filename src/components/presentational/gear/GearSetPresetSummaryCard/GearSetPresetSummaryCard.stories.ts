import type { Meta, StoryObj } from "@storybook/react";

import { exampleGearSetPreset } from "../../../__fixtures__/gear-set-preset";
import { GearSetPresetSummaryCard } from "./GearSetPresetSummaryCard";

const meta: Meta<typeof GearSetPresetSummaryCard> = {
  component: GearSetPresetSummaryCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSetPresetSummaryCard>;

const preset = exampleGearSetPreset;

export const Default: Story = {
  args: { preset },
};
