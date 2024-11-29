import type { Meta, StoryObj } from "@storybook/react";
import { proxy } from "valtio";

import { gearTypesLookup } from "../../../definitions/gear-types";
import { statTypesLookup } from "../../../definitions/stat-types";
import { Gear } from "../../../models/gear/gear";
import { RandomStat } from "../../../models/random-stat";
import { GearEditor } from "./GearEditor";

const meta: Meta<typeof GearEditor> = {
  title: "Gear Editor",
  component: GearEditor,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearEditor>;

const gear = proxy(new Gear(gearTypesLookup.byId["Eyepiece"], "characterId"));
gear.stars = 3;
gear.setRandomStat(
  0,
  new RandomStat(statTypesLookup.byId["Physical Attack %"]),
);
gear.setRandomStat(1, new RandomStat(statTypesLookup.byId["Crit"]));
gear.setRandomStat(2, new RandomStat(statTypesLookup.byId["Flame Attack"]));
export const Default: Story = {
  args: { gearState: gear },
};

const titanGear = proxy(
  new Gear(gearTypesLookup.byId["Eyepiece"], "characterId"),
);
Gear.copy(gear, titanGear);
titanGear.isAugmented = true;
export const Titan: Story = {
  args: { gearState: titanGear },
};
