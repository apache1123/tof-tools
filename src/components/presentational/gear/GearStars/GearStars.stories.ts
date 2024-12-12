import type { Meta, StoryObj } from "@storybook/react";

import { getGearType } from "../../../../definitions/gear-types";
import { Gear } from "../../../../models/gear/gear";
import { GearStars } from "./GearStars";

const meta: Meta<typeof GearStars> = {
  title: "Gear Stars",
  component: GearStars,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearStars>;

const gear = new Gear(getGearType("Eyepiece"), "characterId");
gear.stars = 3;

export const Default: Story = {
  args: {
    gear,
  },
};
