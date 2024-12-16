import type { Meta, StoryObj } from "@storybook/react";

import { getGearType } from "../../../../definitions/gear-types";
import { statTypesLookup } from "../../../../definitions/stat-types";
import { Gear } from "../../../../models/gear/gear";
import { RandomStat } from "../../../../models/gear/random-stat";
import { GearCard } from "./GearCard";

const meta: Meta<typeof GearCard> = {
  component: GearCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearCard>;

const characterId = "characterId";

const gear = new Gear(getGearType("Eyepiece"), characterId);
gear.stars = 3;
gear.setRandomStat(0, new RandomStat(statTypesLookup.byId["Attack"]));
gear.setRandomStat(
  1,
  new RandomStat(statTypesLookup.byId["Physical Attack %"]),
);
gear.setRandomStat(2, new RandomStat(statTypesLookup.byId["Frost Damage %"]));
export const Default: Story = {
  args: {
    gear,
  },
};

const titanGear = new Gear(getGearType("Eyepiece"), characterId);
titanGear.isAugmented = true;
export const Titan: Story = {
  args: {
    gear: titanGear,
  },
};
