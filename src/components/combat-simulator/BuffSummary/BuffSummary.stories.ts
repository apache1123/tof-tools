import type { Meta, StoryObj } from "@storybook/react";

import { exampleBuffSummary } from "../../__fixtures__/buff-summary";
import { BuffSummary } from "./BuffSummary";

const meta: Meta<typeof BuffSummary> = {
  component: BuffSummary,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BuffSummary>;

export const Default: Story = {
  args: { buffSummary: exampleBuffSummary },
};
