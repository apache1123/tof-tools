import type { Meta, StoryObj } from "@storybook/react";

import { gearTypesLookup } from "../../../definitions/gear-types";
import { statTypesLookup } from "../../../definitions/stat-types";
import { Gear } from "../../../models/gear/gear";
import { RandomStat } from "../../../models/gear/random-stat";
import { GearList } from "./GearList";

const meta: Meta<typeof GearList> = {
  title: "Gear List",
  component: GearList,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearList>;

export const Default: Story = {
  args: {
    gears: generateGears(),
  },
};

function generateGears() {
  const gears: Gear[] = [];
  for (let i = 0; i < 5; i++) {
    const gear = new Gear(gearTypesLookup.byId["Eyepiece"], "characterId");
    gear.stars = 3;
    gear.setRandomStat(0, new RandomStat(statTypesLookup.byId["Attack"]));
    gear.setRandomStat(
      1,
      new RandomStat(statTypesLookup.byId["Physical Attack %"]),
    );
    gear.setRandomStat(
      2,
      new RandomStat(statTypesLookup.byId["Frost Damage %"]),
    );
    gear.setRandomStat(3, new RandomStat(statTypesLookup.byId["HP"]));
    gears.push(gear);
  }
  return gears;
}
