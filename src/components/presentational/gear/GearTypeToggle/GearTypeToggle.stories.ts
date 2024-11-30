import type { Meta, StoryObj } from "@storybook/react";

import { GearTypeToggle } from "./GearTypeToggle";

const meta: Meta<typeof GearTypeToggle> = {
  title: "Gear Type Toggle",
  component: GearTypeToggle,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearTypeToggle>;

export const Default: Story = { args: { values: ["Eyepiece"] } };
