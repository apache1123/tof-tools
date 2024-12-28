import type { Meta, StoryObj } from "@storybook/react";

import { exampleEyepiece, exampleGloves } from "../../__fixtures__/gear";
import { GearCard } from "./GearCard";

const meta: Meta<typeof GearCard> = {
  component: GearCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearCard>;

const gear = exampleEyepiece;
export const Default: Story = {
  args: {
    gear,
  },
};

const titanGear = exampleGloves;
titanGear.isAugmented = true;
export const Titan: Story = {
  args: {
    gear: titanGear,
  },
};
