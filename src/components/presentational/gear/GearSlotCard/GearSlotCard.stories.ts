import type { Meta, StoryObj } from "@storybook/react";

import { getGearType } from "../../../../definitions/gear-types";
import { getStatType } from "../../../../definitions/stat-types";
import { Gear } from "../../../../models/gear/gear";
import { RandomStat } from "../../../../models/gear/random-stat";
import { GearSlotCard } from "./GearSlotCard";

const meta: Meta<typeof GearSlotCard> = {
  component: GearSlotCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearSlotCard>;

export const WithoutGear: Story = {
  args: { type: getGearType("Gloves") },
};

const gear = new Gear(getGearType("Gloves"), "characterId");
gear.setRandomStat(0, new RandomStat(getStatType("Attack")));
gear.setRandomStat(1, new RandomStat(getStatType("Physical Attack %")));
gear.setRandomStat(2, new RandomStat(getStatType("Frost Damage %")));
gear.setRandomStat(3, new RandomStat(getStatType("Resistance")));

export const WithGear: Story = {
  args: {
    type: getGearType("Gloves"),
    gear,
  },
};
