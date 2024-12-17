import type { Meta, StoryObj } from "@storybook/react";

import { exampleEyepiece } from "../../../__fixtures__/gear";
import { GearStars } from "./GearStars";

const meta: Meta<typeof GearStars> = {
  component: GearStars,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearStars>;

const gear = exampleEyepiece;

export const Default: Story = {
  args: {
    gear,
  },
};
