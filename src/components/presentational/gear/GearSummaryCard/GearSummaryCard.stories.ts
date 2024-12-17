import type { Meta, StoryObj } from "@storybook/react";

import { exampleEyepiece } from "../../../__fixtures__/gear";
import { GearSummaryCard } from "./GearSummaryCard";

const meta: Meta<typeof GearSummaryCard> = {
  component: GearSummaryCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSummaryCard>;

const gear = exampleEyepiece;
export const Default: Story = {
  args: { gear },
};
