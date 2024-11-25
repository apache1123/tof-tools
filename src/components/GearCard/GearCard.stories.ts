import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { gearTypesLookup } from "../../definitions/gear-types";
import { Gear } from "../../models/gear/gear";
import { GearCard } from "./GearCard";

const meta: Meta<typeof GearCard> = {
  title: "Gear Card",
  component: GearCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearCard>;

const gear = proxy(new Gear(gearTypesLookup.byId["Eyepiece"], "characterId"));
gear.stars = 3;

export const Default: Story = {
  args: {
    gear,
  },
};

const titanGear = proxy(new Gear(gearTypesLookup.byId["Eyepiece"], ""));
titanGear.isAugmented = true;
export const Titan: Story = {
  args: {
    gear: titanGear,
  },
};
