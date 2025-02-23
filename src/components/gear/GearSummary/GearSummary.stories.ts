import type { Meta, StoryObj } from "@storybook/react";

import { exampleGearSummary } from "../../__fixtures__/gear-summary";
import { GearSummary } from "./GearSummary";

const meta: Meta<typeof GearSummary> = {
  component: GearSummary,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSummary>;

export const Default: Story = {
  args: { summary: exampleGearSummary },
};
