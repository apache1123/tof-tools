import type { Meta, StoryObj } from "@storybook/react";

import { GearFilter } from "./GearFilter";

const meta: Meta<typeof GearFilter> = {
  component: GearFilter,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearFilter>;

export const Default: Story = {
  args: { filter: { gearTypeIds: ["Eyepiece", "Exoskeleton"] } },
};
