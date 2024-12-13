import type { Meta, StoryObj } from "@storybook/react";

import { getGearType } from "../../../../definitions/gear-types";
import { getStatType } from "../../../../definitions/stat-types";
import { Gear } from "../../../../models/gear/gear";
import { GearSet } from "../../../../models/gear/gear-set";
import { RandomStat } from "../../../../models/gear/random-stat";
import { GearSlotCardList } from "./GearSlotCardList";

const meta: Meta<typeof GearSlotCardList> = {
  title: "Gear Slot Card List",
  component: GearSlotCardList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GearSlotCardList>;

const gloves = new Gear(getGearType("Gloves"), "characterId");
gloves.setRandomStat(0, new RandomStat(getStatType("Attack")));
gloves.setRandomStat(1, new RandomStat(getStatType("Physical Attack %")));
gloves.setRandomStat(2, new RandomStat(getStatType("Frost Damage %")));
gloves.setRandomStat(3, new RandomStat(getStatType("Resistance")));

const gearSet = new GearSet();
gearSet.getSlot("Gloves").gear = gloves;

export const FromGearSet: Story = {
  args: {
    gearSlots: gearSet.getSlots(),
  },
};
