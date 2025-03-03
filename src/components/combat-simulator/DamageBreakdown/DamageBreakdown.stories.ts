import type { Meta, StoryObj } from "@storybook/react";

import { exampleDamageBreakdown } from "../../__fixtures__/damage-breakdown";
import { DamageBreakdown } from "./DamageBreakdown";

const meta: Meta<typeof DamageBreakdown> = {
  component: DamageBreakdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DamageBreakdown>;

export const Default: Story = {
  args: { ...exampleDamageBreakdown },
};
