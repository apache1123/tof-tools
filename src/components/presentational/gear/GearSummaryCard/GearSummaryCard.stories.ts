import type { Meta, StoryObj } from "@storybook/react";

import { getGearType } from "../../../../definitions/gear-types";
import { statTypesLookup } from "../../../../definitions/stat-types";
import { Gear } from "../../../../models/gear/gear";
import { RandomStat } from "../../../../models/gear/random-stat";
import { GearSummaryCard } from "./GearSummaryCard";

const meta: Meta<typeof GearSummaryCard> = {
  component: GearSummaryCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof GearSummaryCard>;

const characterId = "characterId";

const gear = new Gear(getGearType("Eyepiece"), characterId);
gear.setRandomStat(0, new RandomStat(statTypesLookup.byId["Attack"]));
gear.setRandomStat(
  1,
  new RandomStat(statTypesLookup.byId["Physical Attack %"]),
);
gear.setRandomStat(2, new RandomStat(statTypesLookup.byId["Frost Damage %"]));
gear.setRandomStat(3, new RandomStat(statTypesLookup.byId["Crit Rate %"]));
export const Default: Story = {
  args: { gear },
};
